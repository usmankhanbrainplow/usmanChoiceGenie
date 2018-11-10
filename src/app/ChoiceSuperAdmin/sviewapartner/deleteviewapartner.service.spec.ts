import { TestBed, inject } from '@angular/core/testing';

import { DeleteviewapartnerService } from './deleteviewapartner.service';

describe('DeleteviewapartnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteviewapartnerService]
    });
  });

  it('should be created', inject([DeleteviewapartnerService], (service: DeleteviewapartnerService) => {
    expect(service).toBeTruthy();
  }));
});
