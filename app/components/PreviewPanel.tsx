import {
  Resume,
  SectionType,
  SubSectionType,
  BulletPointType,
} from "../types/resumeType";

import "../styles/resumeStyles.css";
import { Input } from "./Input";
import { Slider } from "./Slider";
import { useState } from "react";

const Document = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-[794px] h-[1123px] shadow-xl ${className}`}>
      <div className="py-24 px-18 flex flex-col overflow-hidden border-b border-red-100">
        {children}
      </div>
    </div>
  );
};

const BulletPoint = ({ bp }: { bp: BulletPointType }) => {
  const { text, increment } = bp;
  const markers = ["disc", "circle", "square"];
  const markerClass = markers[increment % 3];
  return (
    <li
      style={{ marginLeft: `${increment * 20}px` }}
      className={`${markerClass}`}
    >
      {text}
    </li>
  );
};

const SubSection = ({ ss }: { ss: SubSectionType }) => {
  const { companyName, dateFrom, dateTo, role, location, desc, bulletPoints } =
    ss;
  return (
    <>
      <div className="flex justify-between">
        <h3>{companyName}</h3>
        <h4>
          {dateFrom}
          {dateFrom && dateTo && " – "}
          {dateTo}
        </h4>
      </div>
      <div className="flex justify-between">
        <h5>{role}</h5>
        <h5>{location}</h5>
      </div>
      <p>{desc}</p>
      <ul>
        {bulletPoints.map((bp, i) => (
          <BulletPoint bp={bp} key={i} />
        ))}
      </ul>
    </>
  );
};

const Section = ({ s }: { s: SectionType }) => {
  const { title, subSections } = s;
  return (
    <section>
      <h2>{title}</h2>
      <hr />
      {subSections.map((ss: SubSectionType, i) => (
        <SubSection ss={ss} key={i} />
      ))}
    </section>
  );
};

export const PreviewPanel = ({ doc }: { doc: Resume }) => {
  if (!doc) return null;
  const { title, phone, email, link, location, sections } = doc;
  const [zoom, setZoom] = useState(100);
  const contactItems = [location, email, phone].filter(Boolean);
  return (
    <div>
      <Slider value={zoom} min={50} max={200} step={5} onChange={setZoom} />
      <div className="overflow-hidden">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <Document className="bg-white">
            <h1>{title}</h1>
            <h2>
              {contactItems.join(" | ")}
              {link.url && (
                <>
                  {" | "}
                  <a href={link.url}>{link.label}</a>
                </>
              )}
            </h2>
            <hr />
            {sections.map((s, i) => (
              <Section s={s} key={i} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
