import { TestBed, inject } from '@angular/core/testing';

import { Authgaurd2Service } from './authgaurd2.service';

describe('Authgaurd2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Authgaurd2Service]
    });
  });

  it('should be created', inject([Authgaurd2Service], (service: Authgaurd2Service) => {
    expect(service).toBeTruthy();
  }));
});
