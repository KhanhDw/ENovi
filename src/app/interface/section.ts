export interface Section {
  id: number;
  title: string;
  duration: number;
  finish: boolean;
  isExpanded: boolean;
  homework: boolean;
}

export interface SectionUpdateCourse {
  // courseId: number;
  section_id: number;
  sectionOrder: number;
  section_name: string;
}

