import { TestBed, inject } from '@angular/core/testing';

import { Authgaurd3Service } from './authgaurd3.service';

describe('Authgaurd3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authgaurd3Service]
    });
  });

  it('should be created', inject([Authgaurd3Service], (service: Authgaurd3Service) => {
    expect(service).toBeTruthy();
  }));
});
