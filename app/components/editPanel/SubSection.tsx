import { Resume, SubSectionType } from "@/app/types/resumeType";
import { Card } from "../Card";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { BulletPoint } from "./BulletPoint";
import { SetDocType } from "./EditPanel";
import { useUpdateState } from "@/app/hooks/useUpdateState";
import { Button } from "../Button";
import { IconTrash, IconSwitchVertical } from "@tabler/icons-react";
import { IconButton } from "../IconButton";

const defaultBullet = {
  increment: 0,
  text: "bullet",
};

export const SubSection = ({
  ss,
  path,
  setDoc,
}: {
  ss: SubSectionType;
  path: string;
  setDoc: SetDocType;
}) => {
  const { update, add, remove, switchItems } = useUpdateState<Resume>(setDoc);
  return (
    <Card className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-x-2">
        <Input
          label="Company"
          value={ss.companyName}
          onChange={(v) => update(`${path}.companyName`, v)}
        />
        <div className="flex">
          <Input
            label="Date From"
            value={ss.dateFrom}
            onChange={(v) => update(`${path}.dateFrom`, v)}
          />
          <Input
            label="Date To"
            value={ss.dateTo}
            onChange={(v) => update(`${path}.dateTo`, v)}
          />
        </div>
        <Input
          label="Role"
          value={ss.role}
          onChange={(v) => update(`${path}.role`, v)}
        />
        <Input
          label="Location"
          value={ss.location}
          onChange={(v) => update(`${path}.location`, v)}
        />
      </div>
      <TextArea
        label="Description"
        value={ss.desc}
        onChange={(v) => update(`${path}.desc`, v)}
      />
      <div className="flex flex-col gap-1 mt-2">
        {ss.bulletPoints.map((bp, i) => (
          <div key={i} className="flex flex-col gap-2">
            <BulletPoint
              path={`${path}.bulletPoints[${i}]`}
              setDoc={setDoc}
              bp={bp}
              label={
                <div className="flex justify-between">
                  <span>{`Bullet Point ${i + 1}`}</span>
                  <div className="flex items-center">
                    {i < ss.bulletPoints.length - 1 && (
                      <IconButton
                        iconName="Switch"
                        onClick={() =>
                          switchItems(`${path}.bulletPoints`, i, i + 1)
                        }
                      />
                    )}
                    <IconButton
                      iconName="Trash"
                      danger
                      onClick={() => remove(`${path}.bulletPoints`, i)}
                    />
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </div>
      <Button onClick={() => add(`${path}.bulletPoints`, defaultBullet)}>
        + Add Bullet Point
      </Button>
    </Card>
  );
};
