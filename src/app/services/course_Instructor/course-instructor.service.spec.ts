import { TestBed } from '@angular/core/testing';

import { CourseInstructorService } from './course-instructor.service';

describe('CourseInstructorService', () => {
  let service: CourseInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
