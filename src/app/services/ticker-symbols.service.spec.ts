/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TickerSymbolsService } from './ticker-symbols.service';

describe('Service: TickerSymbols', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TickerSymbolsService]
    });
  });

  it('should ...', inject([TickerSymbolsService], (service: TickerSymbolsService) => {
    expect(service).toBeTruthy();
  }));
});
