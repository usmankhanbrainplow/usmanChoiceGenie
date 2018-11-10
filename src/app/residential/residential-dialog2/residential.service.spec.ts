import { TestBed, inject } from '@angular/core/testing';

import { ResidentialService } from './residential.service';

describe('ResidentialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidentialService]
    });
  });

  it('should be created', inject([ResidentialService], (service: ResidentialService) => {
    expect(service).toBeTruthy();
  }));
});
