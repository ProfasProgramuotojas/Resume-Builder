import {
  BulletPointType,
  Resume,
  SectionType,
  SubSectionType,
} from "../types/resumeType";
import { Accordion, AccordionItem } from "./Accordion";
import { Card } from "./Card";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

const BulletPointForm = ({ bp }: { bp: BulletPointType }) => {
  return (
    <Card className="flex" label="Bullet Point">
      <div className="w-1/6">
        <Input label="increment" type={"number"} value={bp.increment} />
      </div>
      <Input label="text" value={bp.text} />
    </Card>
  );
};

const SubSectionForm = ({ ss }: { ss: SubSectionType }) => {
  return (
    <Card label="Sub Section">
      <div className="grid grid-cols-2">
        <Input label="Company" value={ss.companyName} />
        <div className="flex">
          <Input label="Date From" value={ss.dateFrom} />
          <Input label="Date To" value={ss.dateTo} />
        </div>
        <Input label="Role" value={ss.role} />
        <Input label="Location" value={ss.location} />
      </div>
      <TextArea label="Description" value={ss.desc} />
      {ss.bulletPoints.map((bp, i) => (
        <BulletPointForm bp={bp} key={i} />
      ))}
    </Card>
  );
};

const SectionForm = ({ s }: { s: SectionType }) => {
  return (
    <Card className="border p-1" label="Section">
      <Input label="Section Title" value={s.title} />
      <Accordion>
        {s.subSections.map((ss) => (
          <AccordionItem key={ss.companyName} label={ss.companyName}>
            <SubSectionForm ss={ss} />
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export const EditPanel = ({
  doc,
  setDoc,
}: {
  doc: Resume;
  setDoc: (doc: Resume) => void;
}) => {
  if (!doc) return null;

  return (
    <Card className="w-1/2 p-5">
      <h1>Edit Resume</h1>

      <div className="grid grid-cols-2">
        <Input label="Location" value={doc.location} />
        <Input label="Email" value={doc.email} />
        <Input label="Phone num." value={doc.phone} />
        <Input label="Link" value={doc.link} />
      </div>
      <Accordion>
        {doc.sections.map((s) => (
          <AccordionItem label={s.title} key={s.title}>
            <SectionForm s={s} />
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};
