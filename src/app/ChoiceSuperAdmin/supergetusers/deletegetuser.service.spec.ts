import { TestBed, inject } from '@angular/core/testing';

import { DeletegetuserService } from './deletegetuser.service';

describe('DeleteviewapartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletegetuserService]
    });
  });

  it('should be created', inject([DeletegetuserService], (service: DeletegetuserService) => {
    expect(service).toBeTruthy();
  }));
});
