import { TestBed } from '@angular/core/testing';

import { FrenchMenService } from './french-men.service';

describe('FrenchMenService', () => {
  let service: FrenchMenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrenchMenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
