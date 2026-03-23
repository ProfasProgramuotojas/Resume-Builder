"use client";

import { PreviewPanel } from "./components/PreviewPanel";
import { useEffect, useState } from "react";
import { Resume } from "./types/resumeType";
import { EditPanel } from "./components/editPanel/EditPanel";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultResume } from "./data/defaultResume";

export default function Home() {
  const { get, set } = useLocalStorage<Resume>("doc");
  const [doc, setDoc] = useState<Resume>(defaultResume);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uploadedDoc = get();
    if (uploadedDoc) setDoc(uploadedDoc);
    setLoading(false);
  }, []);

  useEffect(() => {
    set(doc);
  }, [doc]);

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <main>
      <div className="flex w-full gap-5 p-5">
        <EditPanel doc={doc} setDoc={setDoc} />
        <PreviewPanel doc={doc} />
      </div>
    </main>
  );
}
