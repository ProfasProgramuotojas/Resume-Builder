import {
  Document,
  ExternalHyperlink,
  ITableCellBorders,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";
import {
  BulletPointType,
  Resume,
  SectionType,
  SubSectionType,
} from "../types/resumeType";

const margin = {
  top: `${1}in`,
  bottom: `${1}in`,
  left: `${2}cm`,
  right: `${2}cm`,
} as const;

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
  gap: { size: 2 },
} as const;

type StylingKey = keyof typeof styling;

const createText = (text: string, style: StylingKey) =>
  new TextRun({
    text,

    ...styling[style],
  });

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

const createParagraph = (children: TextRun[], align?: "left" | "right") => {
  return new Paragraph({
    alignment: align,
    children: children,
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
  const cellsRow1 = [
    createTableCell({
      children: [createParagraph([createText(subSection.companyName, "h3")])],
    }),
    createTableCell({
      children: [
        createParagraph(
          [createText(`${subSection.dateFrom} – ${subSection.dateTo}`, "h4")],
          "right",
        ),
      ],
    }),
  ];

  const cellsRow2 = [
    createTableCell({
      children: [createParagraph([createText(subSection.role, "h5")])],
    }),
    createTableCell({
      children: [
        createParagraph([createText(subSection.location, "h5")], "right"),
      ],
    }),
  ];

  const desc = createParagraph([createText(subSection.desc, "text")]);

  const bullets = createList(subSection.bulletPoints);
  return [createTable(cellsRow1), createTable(cellsRow2), desc, ...bullets];
};

const createSection = (section: SectionType) => {
  const paragraph = [createParagraph([createText(section.title, "h2")])];
  const cell = [
    createTableCell({ children: paragraph, colspan: 2, borders: bottomBorder }),
  ];

  return [
    createTable(cell),
    ...section.subSections.flatMap((ss) => [...createSubSection(ss)]),
  ];
};

const createTitle = (title: string) =>
  createParagraph([createText(title, "h1")]);

export const docToDocx = (doc: Resume) => {
  if (!doc) return null;
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
          ...doc.sections.flatMap((section) => createSection(section)),
        ],
      },
    ],
  });

  return Packer.toBlob(dox);
};
