import { TestBed, inject } from '@angular/core/testing';

import { HistorypurchaseService } from './historypurchase.service';

describe('HistorypurchaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistorypurchaseService]
    });
  });

  it('should be created', inject([HistorypurchaseService], (service: HistorypurchaseService) => {
    expect(service).toBeTruthy();
  }));
});
