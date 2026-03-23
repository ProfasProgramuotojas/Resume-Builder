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
  doc,
}: {
  children: React.ReactNode;
  className?: string;
  doc: Resume;
}) => {
  if (!doc) return;
  const marginInPixels = doc.margin * 96 * 2;

  return (
    <div
      className={`w-[794px] h-[1123px] shadow-xl overflow-hidden flex justify-center items-center ${className}`}
    >
      <div
        style={{
          width: `calc(794px - ${marginInPixels}px)`,
          height: `calc(1123px - ${marginInPixels}px)`,
        }}
        className="overflow-hidden flex flex-col min-h-0"
      >
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

const Section = ({ s, sb, sa }: { s: SectionType; sb: number; sa: number }) => {
  const { title, subSections } = s;
  return (
    <section>
      <h2 style={{ marginTop: `${sb}px` }}>{title}</h2>
      <hr style={{ marginBottom: `${sa}px` }} />
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
      <Slider value={zoom} min={50} max={150} step={5} onChange={setZoom} />
      <div className="overflow-hidden">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <Document className="bg-white" doc={doc}>
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
              <Section s={s} key={i} sb={doc.spaceBefore} sa={doc.spaceAfter} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
