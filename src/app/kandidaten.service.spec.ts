import { TestBed, inject } from '@angular/core/testing';

import { KandidatenService } from './kandidaten.service';

describe('KandidatenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KandidatenService]
    });
  });

  it('should be created', inject([KandidatenService], (service: KandidatenService) => {
    expect(service).toBeTruthy();
  }));
});
