"use client";

import { PreviewPanel } from "./components/PreviewPanel";
import { useState } from "react";
import { Resume } from "./types/resumeType";
import { EditPanel } from "./components/editPanel/EditPanel";
import { Button } from "./components/Button";
import { ExportDocx } from "./components/ExportDocx";

const d: Resume = {
  title: "Mykolas Ločas",
  phone: "+370 600 12345",
  email: "mykolas@career.io",
  location: "Vilnius, Lithuania",
  link: { label: "GitHub", url: "https://github.com/mykolas" },
  sections: [
    {
      title: "Work Experience",
      subSections: [
        {
          companyName: "Nova Labs",
          dateFrom: "Aug 2022",
          dateTo: "Present",
          role: "Senior Full-Stack Developer",
          location: "Remote",
          desc: "Leading web platform engineering for a SaaS product used by 200k+ users monthly.",
          bulletPoints: [
            {
              increment: 0,
              text: "Architected a modular Next.js frontend used across marketing, dashboard, and admin apps.",
            },
            {
              increment: 0,
              text: "Designed a feature toggle workflow and CI pipeline reducing release risk by 60%.",
            },
            {
              increment: 1,
              text: "Built real-time notifications + analytics with Socket.io and Redis, improving response time by 40%.",
            },
            {
              increment: 0,
              text: "Mentored 5 engineers and led code reviews to improve team velocity and quality.",
            },
          ],
        },
        {
          companyName: "Culturio",
          dateFrom: "Jan 2020",
          dateTo: "Jul 2022",
          role: "Full-Stack Developer",
          location: "Vilnius, Lithuania",
          desc: "Delivered event discovery product features used by product marketing teams across EMEA.",
          bulletPoints: [
            {
              increment: 0,
              text: "Implemented a reusable component system in React, reducing UI development time by 35%.",
            },
            {
              increment: 0,
              text: "Built secure REST APIs in Node.js and PostgreSQL supporting multi-tenant user data.",
            },
            {
              increment: 1,
              text: "Created automated e2e tests with Playwright, cutting manual regression time by half.",
            },
          ],
        },
      ],
    },
    {
      title: "Education",
      subSections: [
        {
          companyName: "Vilnius Tech University",
          dateFrom: "2015",
          dateTo: "2019",
          role: "BSc in Computer Science",
          location: "Vilnius, Lithuania",
          desc: "Graduated with honors, specializing in software engineering and data algorithms.",
          bulletPoints: [
            {
              increment: 0,
              text: "Final project: real-time scheduling app with React + Firebase.",
            },
            {
              increment: 0,
              text: "Member of student coding club and open-source hackathon teams.",
            },
          ],
        },
      ],
    },
  ],
};

export default function Home() {
  const [doc, setDoc] = useState<Resume>(d);

  return (
    <main>
      <div className="flex w-full">
        <EditPanel doc={doc} setDoc={setDoc} />
        <PreviewPanel doc={doc} />
      </div>
      <ExportDocx doc={doc} />
    </main>
  );
}
