import { Course } from './../../../interface/course';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-courses-of-instructor',
  templateUrl: './courses-of-instructor.component.html',
  styleUrl: './courses-of-instructor.component.css',
  standalone: false,
})
export class CoursesOfInstructorComponent {
  courses: Course[] = [
    {
      id: 1,
      title:
        'New Hire Onboarding New Hire Onboarding New Hire Onboarding v New Hire Onboarding New Hire Onboarding New Hire Onboarding New ',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B8D3F060E-0D4E-4C7C-9D42-A4E9F49E7936%7D-jNng7IdvT77IUHB8f6nJ3Q3M6Xucnc.png',
      enrollments: 31,
      rating: 4.5,
      duration: '10 giờ',
    },
    {
      id: 2,
      title: 'Sales Onboarding',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B8D3F060E-0D4E-4C7C-9D42-A4E9F49E7936%7D-jNng7IdvT77IUHB8f6nJ3Q3M6Xucnc.png',
      enrollments: 14,
      rating: 4.86,
      duration: '10 giờ',
    },
    {
      id: 3,
      title: 'L&D Industry Research',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B8D3F060E-0D4E-4C7C-9D42-A4E9F49E7936%7D-jNng7IdvT77IUHB8f6nJ3Q3M6Xucnc.png',
      enrollments: 23,
      rating: 4.0,
      duration: '10 giờ',
    },
    {
      id: 4,
      title: 'B2B Skills to Succeed',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B8D3F060E-0D4E-4C7C-9D42-A4E9F49E7936%7D-jNng7IdvT77IUHB8f6nJ3Q3M6Xucnc.png',
      enrollments: 7,
      rating: 5.0,
      duration: '10 giờ',
    },
    {
      id: 5,
      title: 'B2B Skills to Succeed',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B8D3F060E-0D4E-4C7C-9D42-A4E9F49E7936%7D-jNng7IdvT77IUHB8f6nJ3Q3M6Xucnc.png',
      enrollments: 7,
      rating: 5.0,
      duration: '10 giờ',
    },
  ];

  searchText: string = '';
  sortBy: string = 'newest';
  viewMode: string = 'grid';

  onSearch(event: any) {
    this.searchText = event.target.value;
    // Implement search logic here
  }

  onSortChange(event: any) {
    this.sortBy = event.target.value;
    // Implement sort logic here
  }

  changeView(mode: string) {
    this.viewMode = mode;
  }

  getStarArray(rating: number): number[] {
    duration: '10 giờ';
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.floor(rating) ? 1 : 0));
    duration: '10 giờ';
  }
}
