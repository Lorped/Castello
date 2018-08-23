import { TestBed, inject } from '@angular/core/testing';

import { OggettiService } from './oggetti.service';

describe('OggettiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OggettiService]
    });
  });

  it('should be created', inject([OggettiService], (service: OggettiService) => {
    expect(service).toBeTruthy();
  }));
});
