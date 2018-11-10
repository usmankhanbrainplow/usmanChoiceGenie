import { TestBed, inject } from '@angular/core/testing';

import { DeletereviewService } from './deletereview.service';

describe('DeletereviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletereviewService]
    });
  });

  it('should be created', inject([DeletereviewService], (service: DeletereviewService) => {
    expect(service).toBeTruthy();
  }));
});
