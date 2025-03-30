export interface Course {
  id: number;
  title: string;
  thumbnail: string;
  enrollments: number;
  rating: number;
  duration: number;
}

export interface CourseAdmin {
  course_id: number;           // c.id AS course_id
  course_title: string;        // c.title AS course_title
  price: number;              // c.price
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'; // c.level
  instructorId: number;        // c.instructorId
  instructorName: string; // u.username AS instructor_username
  rating: number;             // c.rating
  img: string;                // c.img
  total_enrollments: number;  // COUNT(e.userId) AS total_enrollments
  createdAt: Date;  
  revenue: number;   
  instructorAvatar:string         // SUM(e.price) AS revenue
}


export interface CourseSearch {
  id: number;
  img: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  percent_discount: number;
  code_discount: string;
}

export interface CourseDetail {
  id: number;
  title: string;
  price: number;
  level: string;
  instructorId: number;
  instructorName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  img: string;
  duration: string;
  rating: number;
  languages: string;
  code_discount: string;
  languageName: string; //subtitles_
  percent_discount: number;
  overview: string;
  description: string;
  requirements: string;
  targetAudience: string;
  whatToLearn: string;
}

export interface CourseInstructor {
  id: number;
  title: string;
  img: string;
  rating: number;
  price: number;
  enrollments: number;
  enrollmentsPerMonth: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseUpdate {
  id: number;
  title: string;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  instructorId: number;
  status: 'suspended' | 'active' | 'limited';
  createdAt: string;
  updatedAt: string;
  img: string;
  duration: number;
  rating: number;
  subtitle_code: string;
  language_code: string;
  language_name: string;
  code_discount?: string;
  percent_discount: number;
  categoryId: number;
  category_name: string;
  categoryType: string;
  overview: string;
  whatToLearn:string;
  requirements:string;
  description:string;
  section_name:string;
  sectionOrder: number;
  intro_video:string;
}



export interface CourseRrevailing {
  id: number;
  title: string;
  img: string;
  rating: number;
  price: number;
}


export interface CourseMyLearning {
  id: number;
  title: string;
  img: string;
}