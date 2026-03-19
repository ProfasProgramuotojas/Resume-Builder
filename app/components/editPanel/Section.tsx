import { Resume, SectionType } from "@/app/types/resumeType";
import { Input } from "../Input";
import { Accordion, AccordionItem } from "../Accordion";
import { SubSection } from "./SubSection";
import { SetDocType } from "./EditPanel";
import { useUpdateState } from "@/app/hooks/useUpdateState";
import { Button } from "../Button";
import { IconTrash, IconSwitchVertical } from "@tabler/icons-react";
import { IconButton } from "../IconButton";

const defaultSubSection = {
  companyName: "Company 1",
  dateFrom: "",
  dateTo: "",
  role: "",
  location: "",
  desc: "",
  bulletPoints: [],
};

export const Section = ({
  s,
  i,
  setDoc,
}: {
  s: SectionType;
  i: number;
  setDoc: SetDocType;
}) => {
  const path = `sections[${i}]`;
  const { update, add, remove, switchItems } = useUpdateState<Resume>(setDoc);

  return (
    <div className="flex flex-col gap-2">
      <Input
        label="Section Title"
        value={s.title}
        onChange={(v) => update(`${path}.title`, v)}
      />

      <Accordion>
        {s.subSections.map((ss, j) => (
          <AccordionItem
            key={j}
            label={ss.companyName || `Subsection ${j + 1}`}
            actions={
              <div className="flex items-center">
                <IconButton
                  danger
                  iconName="Trash"
                  onClick={() => remove(`${path}.subSections`, j)}
                />
                {j < s.subSections.length - 1 && (
                  <IconButton
                    iconName="Switch"
                    onClick={() => switchItems(`${path}.subSections`, j, j + 1)}
                  />
                )}
              </div>
            }
          >
            <div className="flex flex-col gap-2">
              <SubSection
                ss={ss}
                path={`${path}.subSections[${j}]`}
                setDoc={setDoc}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
      <Button onClick={() => add(`${path}.subSections`, defaultSubSection)}>
        + Add Subsection
      </Button>
    </div>
  );
};
