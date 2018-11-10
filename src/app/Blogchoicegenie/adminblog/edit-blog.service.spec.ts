import { TestBed, inject } from '@angular/core/testing';

import { EditBlogService } from './edit-blog.service';

describe('EditBlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditBlogService]
    });
  });

  it('should be created', inject([EditBlogService], (service: EditBlogService) => {
    expect(service).toBeTruthy();
  }));
});
