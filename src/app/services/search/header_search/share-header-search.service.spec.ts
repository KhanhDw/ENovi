import { TestBed } from '@angular/core/testing';

import { ShareHeaderSearchService } from './share-header-search.service';

describe('ShareHeaderSearchService', () => {
  let service: ShareHeaderSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareHeaderSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
