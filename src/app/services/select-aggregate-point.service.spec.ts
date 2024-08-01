/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectAggregatePointService } from './select-aggregate-point.service';

describe('Service: SelectAggregatePoint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectAggregatePointService]
    });
  });

  it('should ...', inject([SelectAggregatePointService], (service: SelectAggregatePointService) => {
    expect(service).toBeTruthy();
  }));
});
