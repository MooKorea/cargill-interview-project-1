/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetAggregatesService } from './get-aggregates.service';

describe('Service: GetAggregates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAggregatesService]
    });
  });

  it('should ...', inject([GetAggregatesService], (service: GetAggregatesService) => {
    expect(service).toBeTruthy();
  }));
});
