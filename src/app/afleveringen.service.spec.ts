import { TestBed, inject } from '@angular/core/testing';

import { AfleveringenService } from './afleveringen.service';

describe('AfleveringenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfleveringenService]
    });
  });

  it('should be created', inject([AfleveringenService], (service: AfleveringenService) => {
    expect(service).toBeTruthy();
  }));
});
