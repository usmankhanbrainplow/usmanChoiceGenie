import { TestBed, inject } from '@angular/core/testing';

import { Authgaurd4Service } from './authgaurd4.service';

describe('Authgaurd4Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authgaurd4Service]
    });
  });

  it('should be created', inject([Authgaurd4Service], (service: Authgaurd4Service) => {
    expect(service).toBeTruthy();
  }));
});
