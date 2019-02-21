import { TestBed } from '@angular/core/testing';

import { AlllistService } from './alllist.service';

describe('AlllistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlllistService = TestBed.get(AlllistService);
    expect(service).toBeTruthy();
  });
});
