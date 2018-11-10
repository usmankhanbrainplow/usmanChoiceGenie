import { TestBed, inject } from '@angular/core/testing';

import { EditreviewService } from './editreview.service';

describe('EditreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditreviewService]
    });
  });

  it('should be created', inject([EditreviewService], (service: EditreviewService) => {
    expect(service).toBeTruthy();
  }));
});
