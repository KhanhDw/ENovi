export interface Course {
  id: number;
  title: string;
  thumbnail: string;
  enrollments: number;
  rating: number;
  duration: number;
}

export interface CourseAdmin {
  id: number;
  title: string;
  thumbnail: string;
  enrollments: number;
  rating: number;
  duration: number;
  price: number;
  lecture: number;
  revenue: number;
  commission: number;
  instructor: string;
  category: string;
}
export interface CourseSearch {
  img: string;
  title: string;
  description: string;
  author: string;
  duration: number;
  rate: string;
  price: number;
}
