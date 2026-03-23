import {
  Document,
  ExternalHyperlink,
  IPageMarginAttributes,
  IParagraphOptions,
  ITableCellBorders,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import {
  BulletPointType,
  Resume,
  SectionType,
  SubSectionType,
} from "../types/resumeType";

const noBorder = { style: "none", size: 0, color: "FFFFFF" } as const;

const fullWidth = { size: `${100}%` } as const;

const bottomBorder = {
  top: noBorder,
  left: noBorder,
  right: noBorder,
  bottom: {
    style: "single",
    size: 6,
    color: "000000",
  },
} as const;

const noBorders = {
  top: noBorder,
  left: noBorder,
  right: noBorder,
  bottom: noBorder,
} as const;

const styling = {
  h1: { size: `${25}pt` },
  h2: { size: `${14}pt` },
  h3: { size: `${13}pt`, bold: true },
  h4: { size: `${12}pt`, bold: true },
  h5: { size: `${12}pt`, italics: true },
  text: { size: `${12}pt` },
  gap: { size: `${1}pt` },
} as const;

type StylingKey = keyof typeof styling;

const createText = (text: string, style: StylingKey) =>
  new TextRun({
    text,
    ...styling[style],
  });

const createSpace = (height: number) => {
  if (!height || height < 1) return null;
  return new Paragraph({
    children: [new TextRun("")],
    spacing: {
      line: height * 20,
      lineRule: "exact",
    },
  });
};

const createTable = (children: TableCell[]) =>
  new Table({
    width: fullWidth,
    rows: [
      new TableRow({
        children: children,
      }),
    ],
  });

const createTableCell = ({
  children,
  colspan = 1,
  borders = noBorders,
}: {
  children: Paragraph[];
  colspan?: number;
  borders?: ITableCellBorders;
}) => {
  return new TableCell({
    columnSpan: colspan,
    borders: borders,
    children: children,
  });
};

const createParagraph = (
  children: (TextRun | ExternalHyperlink)[],
  align?: "left" | "right",
) => {
  return new Paragraph({
    alignment: align,
    children,
  });
};

const createList = (bulletPoints: BulletPointType[]) => {
  return bulletPoints.map((bp) => {
    const baseLeft = 360;
    const baseHanging = 180;

    return new Paragraph({
      children: [createText(bp.text, "text")],
      bullet: {
        level: bp.increment,
      },
      indent: {
        left: baseLeft * (bp.increment + 1),
        hanging: baseHanging,
      },
    });
  });
};

const createSubSection = (subSection: SubSectionType) => {
  const row1Cells = [];

  if (subSection.companyName) {
    row1Cells.push(
      createTableCell({
        children: [createParagraph([createText(subSection.companyName, "h3")])],
      }),
    );
  }

  if (subSection.dateFrom || subSection.dateTo) {
    row1Cells.push(
      createTableCell({
        children: [
          createParagraph(
            [
              createText(
                [subSection.dateFrom, subSection.dateTo]
                  .filter(Boolean)
                  .join(" – "),
                "h4",
              ),
            ],
            "right",
          ),
        ],
      }),
    );
  }

  const row2Cells = [];

  if (subSection.role) {
    row2Cells.push(
      createTableCell({
        children: [createParagraph([createText(subSection.role, "h5")])],
      }),
    );
  }

  if (subSection.location) {
    row2Cells.push(
      createTableCell({
        children: [
          createParagraph([createText(subSection.location, "h5")], "right"),
        ],
      }),
    );
  }

  const elements = [];

  if (row1Cells.length) elements.push(createTable(row1Cells));
  if (row2Cells.length) elements.push(createTable(row2Cells));

  if (subSection.desc) {
    elements.push(createParagraph([createText(subSection.desc, "text")]));
  }

  if (subSection.bulletPoints?.length) {
    elements.push(...createList(subSection.bulletPoints));
  }

  return elements;
};

const createSection = (section: SectionType, sb: number, sa: number) => {
  const paragraph = [createParagraph([createText(section.title, "h2")])];

  const cell = [
    createTableCell({
      children: paragraph,
      colspan: 2,
      borders: bottomBorder,
    }),
  ];

  return [
    createSpace(sb),
    createTable(cell),
    createSpace(sa),
    ...section.subSections.flatMap((ss) => createSubSection(ss)),
  ].filter((el) => el !== null);
};

const createContacts = (
  phone: string,
  email: string,
  location: string,
  linkLabel: string,
  linkUrl: string,
) => {
  const contacts = [location, email, phone].filter(Boolean);
  const contactString = contacts.join(" | ");

  const children: (TextRun | ExternalHyperlink)[] = [
    createText(contactString, "h2"),
  ];

  if (linkLabel && linkUrl) {
    children.push(createText(" | ", "h2"));
    children.push(
      new ExternalHyperlink({
        link: linkUrl,
        children: [createText(linkLabel, "h2")],
      }),
    );
  }

  const paragraph = createParagraph(children);

  return createTable([
    createTableCell({
      children: [paragraph],
      colspan: 2,
      borders: bottomBorder,
    }),
  ]);
};

const createTitle = (title: string) =>
  createParagraph([createText(title, "h1")]);

export const docToDocx = (doc: Resume) => {
  if (!doc) return null;
  const margin = {
    top: `${doc.margin}in`,
    bottom: `${doc.margin}in`,
    left: `${doc.margin}in`,
    right: `${doc.margin}in`,
  } as IPageMarginAttributes;

  const dox = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Times New Roman",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: margin,
          },
        },
        children: [
          createTitle(doc.title),
          createContacts(
            doc.phone,
            doc.email,
            doc.location,
            doc.link.label,
            doc.link.url,
          ),
          ...doc.sections.flatMap((section) =>
            createSection(section, doc.spaceBefore, doc.spaceAfter),
          ),
        ],
      },
    ],
  });

  return Packer.toBlob(dox);
};
