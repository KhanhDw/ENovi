import { TestBed } from '@angular/core/testing';

import { UploadImgServerService } from './upload-img-server.service';

describe('UploadImgServerService', () => {
  let service: UploadImgServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImgServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
