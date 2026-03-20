import { Resume } from "../types/resumeType";
import { Button } from "./Button";

export const ExportJson = ({ doc }: { doc: Resume }) => {
  const handleExport = () => {
    if (!doc) return;

    const json = JSON.stringify(doc, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Save as JSON</Button>;
};