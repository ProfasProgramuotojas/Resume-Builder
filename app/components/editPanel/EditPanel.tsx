import { useUpdateState } from "@/app/hooks/useUpdateState";
import { Resume } from "../../types/resumeType";
import { Accordion, AccordionItem } from "../Accordion";
import { Card } from "../Card";
import { Input } from "../Input";
import { Section } from "./Section";
import { Button } from "../Button";
import { IconSwitchVertical, IconTrash } from "@tabler/icons-react";
import { IconButton } from "../IconButton";
import { ExportDocx } from "../ExportDocx";
import { ExportJson } from "../ExportJSON";
import { ImportJson } from "../ImportJson";
import { Spacings } from "./Spacings";

export type SetDocType = React.Dispatch<React.SetStateAction<Resume>>;

const defaultSection = {
  title: "Title 1",
  subSections: [],
};

export const EditPanel = ({
  doc,
  setDoc,
}: {
  doc: Resume;
  setDoc: SetDocType;
}) => {
  if (!doc) return null;

  const { update, add, remove, switchItems } = useUpdateState<Resume>(setDoc);

  return (
    <Card className="w-1/2 flex flex-col gap-2">
      <div className="flex justify-between">
        <h1>Create Resume</h1>
        <div className="flex gap-2">
          <ExportDocx doc={doc} />
          <ExportJson doc={doc} />
          <ImportJson onImport={(d) => setDoc(d)} />
        </div>
      </div>
      <Spacings doc={doc} setDoc={setDoc} />
      <Input
        label="Full Name"
        value={doc.title}
        onChange={(v) => update("title", v)}
      />
      <div className="grid grid-cols-2 gap-x-2 -mt-2">
        <Input
          label="Location"
          value={doc.location}
          onChange={(v) => update("location", v)}
        />
        <Input
          label="Email"
          value={doc.email}
          onChange={(v) => update("email", v)}
        />
        <Input
          label="Phone num."
          value={doc.phone}
          onChange={(v) => update("phone", v)}
        />
        <div className="flex">
          <Input
            label="Link Label"
            value={doc.link.label}
            onChange={(v) => update("link.label", v)}
          />
          <Input
            label="Link URL"
            value={doc.link.url}
            onChange={(v) => update("link.url", v)}
          />
        </div>
      </div>
      <Accordion>
        {doc.sections.map((s, i) => (
          <AccordionItem
            label={s.title}
            key={i}
            actions={
              <>
                <IconButton
                  danger
                  iconName="Trash"
                  onClick={() => remove("sections", i)}
                />
                {i < doc.sections.length - 1 && (
                  <IconButton
                    iconName="Switch"
                    onClick={() => switchItems("sections", i, i + 1)}
                  />
                )}
              </>
            }
          >
            <div className="flex flex-col gap-2">
              <Section s={s} i={i} setDoc={setDoc} />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={() => add("sections", defaultSection)}>
        + Add Section
      </Button>
    </Card>
  );
};
