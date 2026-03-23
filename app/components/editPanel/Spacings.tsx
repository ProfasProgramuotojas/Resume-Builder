import React from "react";
import { Slider } from "../Slider";
import { Input } from "../Input";
import { Resume } from "@/app/types/resumeType";
import { SetDocType } from "./EditPanel";
import { useUpdateState } from "@/app/hooks/useUpdateState";

export const Spacings = ({
  doc,
  setDoc,
}: {
  doc: Resume;
  setDoc: SetDocType;
}) => {
  const { update } = useUpdateState(setDoc);
  if (!doc) return;
  return (
    <div className="flex gap-2 items-center -mb-2">
      <Slider
        label="Document Margin"
        value={doc.margin}
        min={0.5}
        max={1}
        step={0.25}
        onChange={(v) => update("margin", v)}
      />
      <div className="flex gap-2">
        <Input
          label="Space Before"
          type="number"
          value={doc.spaceBefore}
          onChange={(v) => update("spaceBefore", v)}
        />
        <Input
          label="Space After"
          type="number"
          value={doc.spaceAfter}
          onChange={(v) => update("spaceAfter", v)}
        />
      </div>
    </div>
  );
};
