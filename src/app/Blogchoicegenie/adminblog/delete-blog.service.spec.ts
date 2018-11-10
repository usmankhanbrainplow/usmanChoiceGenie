import { TestBed, inject } from '@angular/core/testing';

import { DeleteBlogService } from './delete-blog.service';

describe('DeleteBlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteBlogService]
    });
  });

  it('should be created', inject([DeleteBlogService], (service: DeleteBlogService) => {
    expect(service).toBeTruthy();
  }));
});
