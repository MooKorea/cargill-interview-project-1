import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerSymbolInputComponent } from './ticker-symbol-input.component';

describe('TickerSymbolInputComponent', () => {
  let component: TickerSymbolInputComponent;
  let fixture: ComponentFixture<TickerSymbolInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerSymbolInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerSymbolInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
