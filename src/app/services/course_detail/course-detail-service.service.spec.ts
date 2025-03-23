import { TestBed } from '@angular/core/testing';

import { CourseDetailServiceService } from './course-detail-service.service';

describe('CourseDetailServiceService', () => {
  let service: CourseDetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
