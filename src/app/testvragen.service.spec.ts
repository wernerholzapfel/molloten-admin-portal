import { TestBed, inject } from '@angular/core/testing';

import { TestvragenService } from './testvragen.service';

describe('TestvragenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestvragenService]
    });
  });

  it('should be created', inject([TestvragenService], (service: TestvragenService) => {
    expect(service).toBeTruthy();
  }));
});
