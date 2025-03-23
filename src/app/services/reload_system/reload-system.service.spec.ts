import { TestBed } from '@angular/core/testing';

import { ReloadSystemService } from './reload-system.service';

describe('ReloadSystemService', () => {
  let service: ReloadSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
