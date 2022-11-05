import { TestBed } from '@angular/core/testing';

import { ListOfDealsService } from './list-of-deals.service';

describe('ListOfDealsService', () => {
  let service: ListOfDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
