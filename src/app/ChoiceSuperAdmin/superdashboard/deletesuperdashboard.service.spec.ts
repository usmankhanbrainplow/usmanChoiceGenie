import { TestBed, inject } from '@angular/core/testing';

import { DeletesuperdashboardService } from './deletesuperdashboard.service';

describe('DeletesuperdashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletesuperdashboardService]
    });
  });

  it('should be created', inject([DeletesuperdashboardService], (service: DeletesuperdashboardService) => {
    expect(service).toBeTruthy();
  }));
});
