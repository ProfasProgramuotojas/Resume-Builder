export type BulletPointType = {
  increment: number;
  text: string;
};

export type SubSectionType = {
  companyName: string;
  dateFrom: string;
  dateTo: string;
  role: string;
  location: string;
  desc: string;
  bulletPoints: BulletPointType[];
};

export type SectionType = {
  title: string;
  subSections: SubSectionType[];
};

export type Resume = {
  title: string;
  phone: string;
  email: string;
  location: string;
  link: string;
  sections: SectionType[];
} | null;
