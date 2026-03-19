import { Resume } from "../types/resumeType";
import { Button } from "./Button";
import { docToDocx } from "../functions/docToDocx";

export const ExportDocx = ({ doc }: { doc: Resume }) => {
  const handleExport = async () => {
    const blob = await docToDocx(doc);
    if (!blob) return null;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.docx";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Export to docx</Button>;
};
