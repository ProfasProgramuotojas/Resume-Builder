import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
  UnderlineType,
} from "docx";

export type BulletPointType = {
  increment: number;
  text: string;
};

export type SubSectionType = {
  companyName: string;
  dateFrom: string;
  dateTo: string;
  role: string;
  location: string;
  desc: string;
  bulletPoints: BulletPointType[];
};

export type SectionType = {
  title: string;
  subSections: SubSectionType[];
};

export type Resume = {
  title: string;
  phone: string;
  email: string;
  location: string;
  link: { label: string; url: string };
  sections: SectionType[];
} | null;

const pageWidthTwip = 11906;
const pageHeightTwip = 16838;

const pxToHalfPoints = (px: number) => Math.round(px * 1.5);

const makeRuleParagraph = () =>
  new Paragraph({
    border: {
      bottom: {
        color: "000000",
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: {
      after: 160,
    },
  });

const rightTab = pageWidthTwip - 1440 - 1440;

const makeTwoColumnParagraph = (
  left: string,
  right: string,
  opts?: {
    leftBold?: boolean;
    rightBold?: boolean;
    leftItalic?: boolean;
    rightItalic?: boolean;
    size?: number;
    spacingAfter?: number;
  }
) =>
  new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: rightTab,
      },
    ],
    spacing: {
      after: opts?.spacingAfter ?? 60,
    },
    children: [
      new TextRun({
        text: left || "",
        bold: opts?.leftBold,
        italics: opts?.leftItalic,
        size: opts?.size,
      }),
      new TextRun("\t"),
      new TextRun({
        text: right || "",
        bold: opts?.rightBold,
        italics: opts?.rightItalic,
        size: opts?.size,
      }),
    ],
  });

const makeBulletParagraph = (bp: BulletPointType) => {
  const level = Math.max(0, Math.min(bp.increment, 2));

  return new Paragraph({
    text: bp.text,
    numbering: {
      reference: "resume-bullets",
      level,
    },
    spacing: {
      after: 40,
    },
  });
};

const makeSubSection = (ss: SubSectionType): Paragraph[] => {
  const paragraphs: Paragraph[] = [];

  const dateText = [ss.dateFrom, ss.dateTo]
    .filter(Boolean)
    .join(ss.dateFrom && ss.dateTo ? " – " : "");

  paragraphs.push(
    makeTwoColumnParagraph(ss.companyName, dateText, {
      leftBold: true,
      rightBold: true,
      size: pxToHalfPoints(17),
      spacingAfter: 20,
    })
  );

  paragraphs.push(
    makeTwoColumnParagraph(ss.role, ss.location, {
      leftItalic: true,
      rightItalic: true,
      size: pxToHalfPoints(16),
      spacingAfter: 40,
    })
  );

  if (ss.desc) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: ss.desc,
            size: pxToHalfPoints(16),
          }),
        ],
        spacing: {
          after: 60,
        },
      })
    );
  }

  for (const bp of ss.bulletPoints) {
    paragraphs.push(makeBulletParagraph(bp));
  }

  paragraphs.push(
    new Paragraph({
      spacing: { after: 120 },
    })
  );

  return paragraphs;
};

const makeSection = (section: SectionType): Paragraph[] => {
  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: {
        before: 120,
        after: 40,
      },
      children: [
        new TextRun({
          text: section.title,
          size: pxToHalfPoints(18),
        }),
      ],
    })
  );

  paragraphs.push(makeRuleParagraph());

  for (const ss of section.subSections) {
    paragraphs.push(...makeSubSection(ss));
  }

  return paragraphs;
};

export const exportResumeToDocxBlob = async (resume: Resume): Promise<Blob> => {
  if (!resume) {
    throw new Error("Resume is null");
  }

  const contactItems = [resume.location, resume.email, resume.phone].filter(Boolean);

  const contactChildren: (TextRun | ExternalHyperlink)[] = [
    new TextRun({
      text: contactItems.join(" | "),
      size: pxToHalfPoints(18),
    }),
  ];

  if (resume.link?.url) {
    if (contactItems.length > 0) {
      contactChildren.push(new TextRun({ text: " | ", size: pxToHalfPoints(18) }));
    }

    contactChildren.push(
      new ExternalHyperlink({
        link: resume.link.url,
        children: [
          new TextRun({
            text: resume.link.label || resume.link.url,
            size: pxToHalfPoints(18),
            style: "Hyperlink",
            underline: {
              type: UnderlineType.SINGLE,
            },
          }),
        ],
      })
    );
  }

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "resume-bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: {
                    left: 720,
                    hanging: 260,
                  },
                },
              },
            },
            {
              level: 1,
              format: LevelFormat.BULLET,
              text: "○",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: {
                    left: 1440,
                    hanging: 260,
                  },
                },
              },
            },
            {
              level: 2,
              format: LevelFormat.BULLET,
              text: "■",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: {
                    left: 2160,
                    hanging: 260,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: pageWidthTwip,
              height: pageHeightTwip,
            },
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          new Paragraph({
            spacing: {
              after: 80,
            },
            children: [
              new TextRun({
                text: resume.title,
                size: pxToHalfPoints(33),
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              after: 100,
            },
            children: contactChildren,
          }),
          makeRuleParagraph(),
          ...resume.sections.flatMap(makeSection),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
};