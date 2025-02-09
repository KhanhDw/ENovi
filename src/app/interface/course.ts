export interface Course {
  id: number;
  title: string;
  thumbnail: string;
  enrollments: number;
  rating: number;
  duration: string;
}

export interface CourseAdmin {
  id: number;
  title: string;
  thumbnail: string;
  enrollments: number;
  rating: number;
  duration: string;
  price: number;
  lecture: number;
  revenue: number;
  commission: number;
  instructor: string;
  category: string;
}
