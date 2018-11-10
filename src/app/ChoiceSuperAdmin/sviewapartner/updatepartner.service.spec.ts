import { TestBed, inject } from '@angular/core/testing';

import { UpdatepartnerService } from './updatepartner.service';

describe('UpdatepartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdatepartnerService]
    });
  });

  it('should be created', inject([UpdatepartnerService], (service: UpdatepartnerService) => {
    expect(service).toBeTruthy();
  }));
});
