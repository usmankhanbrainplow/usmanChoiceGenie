import { TestBed, inject } from '@angular/core/testing';

import { SuperupdateService } from './superupdate.service';

describe('SuperupdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperupdateService]
    });
  });

  it('should be created', inject([SuperupdateService], (service: SuperupdateService) => {
    expect(service).toBeTruthy();
  }));
});
