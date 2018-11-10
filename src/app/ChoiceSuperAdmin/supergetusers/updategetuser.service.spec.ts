import { TestBed, inject } from '@angular/core/testing';

import { UpdategetuserService } from './updategetuser.service';

describe('UpdatepartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdategetuserService]
    });
  });

  it('should be created', inject([UpdategetuserService], (service: UpdategetuserService) => {
    expect(service).toBeTruthy();
  }));
});
