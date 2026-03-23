import { BulletPointType, Resume } from "@/app/types/resumeType";
import { Card } from "../Card";
import { Input } from "../Input";
import { SetDocType } from "./EditPanel";
import { useUpdateState } from "@/app/hooks/useUpdateState";

export const BulletPoint = ({
  bp,
  path,
  setDoc,
  label,
}: {
  bp: BulletPointType;
  path: string;
  label: React.ReactNode;
  setDoc: SetDocType;
}) => {
  const { update } = useUpdateState<Resume>(setDoc);
  return (
    <Card className="flex flex-col">
      <label className="font-bold">{label}</label>
      <div className="flex gap-2">
        <div className="w-1/7">
          <Input
            onChange={(v) => update(`${path}.increment`, Number(v))}
            label="increment"
            type={"number"}
            value={bp.increment}
          />
        </div>
        <Input
          onChange={(v) => update(`${path}.text`, v)}
          label="text"
          value={bp.text}
        />
      </div>
    </Card>
  );
};
