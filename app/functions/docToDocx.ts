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

const newParagraph = (text: string, size: number) =>
  new Paragraph({
    children: [
      new TextRun({
        text: text,
        size: `${size}pt`,
      }),
    ],
  });

// const newText = (text:string) =>new TextRun({
//         text: text,
//         size: `${size}pt`,
//       }),
const createSubSection = (subSection: SubSectionType) => {};

const createSection = (section: SectionType) => {
  return new Table({
    width: {
      size: 5000, // 100%
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: bottomBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.title,
                    size: `${14}pt`,
                  }),
                ],
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
          newParagraph("Title", 25),
          ...doc.sections.flatMap((section) => createSection(section)),
        ],
      },
    ],
  });

  return Packer.toBlob(dox);
};
