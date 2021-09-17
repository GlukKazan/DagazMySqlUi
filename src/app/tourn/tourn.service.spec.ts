import { TestBed } from '@angular/core/testing';

import { TournService } from './tourn.service';

describe('TournService', () => {
  let service: TournService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
