import { TestBed } from '@angular/core/testing';

import { ListLanguageServiceService } from './list-language-service.service';

describe('ListLanguageServiceService', () => {
  let service: ListLanguageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListLanguageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
