import { TestBed } from '@angular/core/testing';

import { ModaldataService } from './modaldata.service';

describe('ModaldataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModaldataService = TestBed.get(ModaldataService);
    expect(service).toBeTruthy();
  });
});
