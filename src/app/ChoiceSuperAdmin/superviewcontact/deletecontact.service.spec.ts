import { TestBed, inject } from '@angular/core/testing';

import { DeletecontactService } from './deletecontact.service';

describe('DeletecontactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletecontactService]
    });
  });

  it('should be created', inject([DeletecontactService], (service: DeletecontactService) => {
    expect(service).toBeTruthy();
  }));
});
