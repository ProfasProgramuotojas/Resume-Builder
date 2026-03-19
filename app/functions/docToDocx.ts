import {
  Document,
  ExternalHyperlink,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { Resume, SectionType, SubSectionType } from "../types/resumeType";

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

const styling = {
  h1: { size: 50 },
  h2: { size: 28 },
  h3: { size: 26, bold: true },
  h4: { size: 24, bold: true },
  h5: { size: 24, italics: true },
  text: { size: 24 },
} as const;

type StylingKey = keyof typeof styling;

const createText = (text: string, style: StylingKey) =>
  new TextRun({
    text,
    ...styling[style],
  });

const createTitle = (title: string) =>
  new Paragraph({ children: [new TextRun({ text: title, ...styling.h5 })] });

const createSubSection = (subSection: SubSectionType) => {};

const createSection = (section: SectionType) => {
  return new Table({
    width: fullWidth,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: bottomBorder,
            children: [
              new Paragraph({
                children: [createText(section.title, "h2")],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

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
