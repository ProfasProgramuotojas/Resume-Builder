"use client";

import { PreviewPanel } from "./components/PreviewPanel";
import { useEffect, useState } from "react";
import { Resume } from "./types/resumeType";
import { EditPanel } from "./components/editPanel/EditPanel";
import { Button } from "./components/Button";
import { ExportDocx } from "./components/ExportDocx";
import { useLocalStorage } from "./hooks/useLocalStorage";

const defaultResume: Resume = {
  title: "Alex Morgan",
  phone: "+370 600 00000",
  email: "alex.morgan@example.com",
  location: "Vilnius, Lithuania",
  link: { label: "Portfolio", url: "https://portfolio.example.com" },
  sections: [
    {
      title: "Work Experience",
      subSections: [
        {
          companyName: "Tech Company",
          dateFrom: "Aug 2022",
          dateTo: "Present",
          role: "Senior Full-Stack Developer",
          location: "Remote",
          desc: "Working on scalable web applications serving thousands of active users.",
          bulletPoints: [
            {
              increment: 0,
              text: "Developed and maintained modern web applications using TypeScript and React.",
            },
            {
              increment: 0,
              text: "Improved performance and reduced load times through optimization techniques.",
            },
            {
              increment: 0,
              text: "Collaborated with product and design teams to deliver new features.",
            },
            {
              increment: 1,
              text: "Implemented real-time features and improved user experience.",
            },
            {
              increment: 0,
              text: "Reviewed code and contributed to engineering standards.",
            },
          ],
        },
        {
          companyName: "Digital Solutions",
          dateFrom: "Jan 2020",
          dateTo: "Jul 2022",
          role: "Full-Stack Developer",
          location: "Vilnius, Lithuania",
          desc: "Built and maintained internal and client-facing platforms.",
          bulletPoints: [
            {
              increment: 0,
              text: "Created reusable UI components to accelerate development.",
            },
            { increment: 0, text: "Developed backend services and APIs." },
            {
              increment: 1,
              text: "Introduced automated testing to improve reliability.",
            },
            {
              increment: 0,
              text: "Worked closely with stakeholders to refine requirements.",
            },
          ],
        },
      ],
    },
    {
      title: "Projects",
      subSections: [
        {
          companyName: "Task Management App",
          dateFrom: "2023",
          dateTo: "2023",
          role: "Personal Project",
          location: "Remote",
          desc: "A web application for managing tasks and productivity workflows.",
          bulletPoints: [
            {
              increment: 0,
              text: "Built a responsive frontend with modern frameworks.",
            },
            {
              increment: 0,
              text: "Implemented authentication and user-specific data handling.",
            },
            {
              increment: 1,
              text: "Added drag-and-drop functionality for task organization.",
            },
          ],
        },
        {
          companyName: "E-commerce Platform",
          dateFrom: "2022",
          dateTo: "2022",
          role: "Side Project",
          location: "Remote",
          desc: "Prototype online store with product listings and checkout flow.",
          bulletPoints: [
            {
              increment: 0,
              text: "Designed product catalog and filtering system.",
            },
            {
              increment: 0,
              text: "Integrated payment processing in a test environment.",
            },
            {
              increment: 1,
              text: "Implemented order tracking and basic analytics.",
            },
          ],
        },
      ],
    },
    {
      title: "Skills",
      subSections: [
        {
          companyName: "Technical Skills",
          dateFrom: "",
          dateTo: "",
          role: "",
          location: "",
          desc: "",
          bulletPoints: [
            {
              increment: 0,
              text: "Languages: JavaScript, TypeScript, HTML, CSS",
            },
            {
              increment: 0,
              text: "Frontend: React, Next.js, responsive design",
            },
            { increment: 0, text: "Backend: Node.js, REST APIs" },
            { increment: 0, text: "Databases: SQL, basic NoSQL concepts" },
            { increment: 0, text: "Tools: Git, CI/CD, testing frameworks" },
          ],
        },
      ],
    },
    {
      title: "Education",
      subSections: [
        {
          companyName: "University",
          dateFrom: "2015",
          dateTo: "2019",
          role: "BSc in Computer Science",
          location: "Vilnius, Lithuania",
          desc: "Focused on software engineering and system design.",
          bulletPoints: [
            {
              increment: 0,
              text: "Completed coursework in data structures and algorithms.",
            },
            {
              increment: 0,
              text: "Worked on multiple academic software projects.",
            },
          ],
        },
      ],
    },
    {
      title: "Certifications",
      subSections: [
        {
          companyName: "Online Learning Platform",
          dateFrom: "2021",
          dateTo: "2021",
          role: "Web Development Certification",
          location: "Online",
          desc: "",
          bulletPoints: [
            {
              increment: 0,
              text: "Covered modern frontend and backend development practices.",
            },
          ],
        },
      ],
    },
  ],
};

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
