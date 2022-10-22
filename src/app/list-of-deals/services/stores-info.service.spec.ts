import { TestBed } from '@angular/core/testing';

import { StoresInfoService } from './stores-info.service';

describe('StoresInfoService', () => {
  let service: StoresInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
