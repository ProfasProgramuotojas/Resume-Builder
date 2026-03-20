import { Resume } from "../types/resumeType";
import { Button } from "./Button";
import { useRef } from "react";

export const ImportJson = ({
  onImport,
}: {
  onImport: (data: Resume) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed: Resume = JSON.parse(text);
        onImport(parsed);
      } catch {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button onClick={handleClick}>Import JSON</Button>
    </>
  );
};
