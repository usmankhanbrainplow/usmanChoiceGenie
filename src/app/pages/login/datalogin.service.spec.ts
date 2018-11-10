import { TestBed, inject } from '@angular/core/testing';

import { DataloginService } from './datalogin.service';

describe('DataloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataloginService]
    });
  });

  it('should be created', inject([DataloginService], (service: DataloginService) => {
    expect(service).toBeTruthy();
  }));
});
