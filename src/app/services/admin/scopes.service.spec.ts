import { TestBed, inject } from '@angular/core/testing';

import { ScopesService } from './scopes.service';

describe('ScopesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopesService]
    });
  });

  it('should be created', inject([ScopesService], (service: ScopesService) => {
    expect(service).toBeTruthy();
  }));
});
