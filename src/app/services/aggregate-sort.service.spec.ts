/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AggregateSortService } from './aggregate-sort.service';

describe('Service: AggregateSort', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateSortService]
    });
  });

  it('should ...', inject([AggregateSortService], (service: AggregateSortService) => {
    expect(service).toBeTruthy();
  }));
});
