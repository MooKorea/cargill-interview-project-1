import { Component, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TickerSymbolsService } from '../../services/ticker-symbols.service';
import { TickerSymbol } from '../../models/tickerSymbol';
import { HttpRequestState } from '../../models/httpRequestState';

@Component({
  selector: 'app-ticker-symbol-input',
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [TickerSymbolsService],
  templateUrl: './ticker-symbol-input.component.html',
  styleUrl: './ticker-symbol-input.component.scss',
})
export class TickerSymbolInputComponent {
  // myControl = new FormControl<string>('');
  options: string[] = [];
  loadingState!: Observable<HttpRequestState<TickerSymbol[]> | null>;

  constructor(private tickerSymbolService: TickerSymbolsService) {}

  value$ = new BehaviorSubject('')

  // ngOnInit() {
  //   this.myControl.valueChanges.pipe().subscribe((value) => {
  //     if (!value) return;
  //     const uppercaseValue = value.toUpperCase();
  //     if (value !== uppercaseValue) {
  //       this.myControl.setValue(uppercaseValue, { emitEvent: false });
  //     }
  //   });

  //   this.loadingState = this.myControl.valueChanges.pipe(
  //     debounceTime(300),
  //     switchMap((value) => {
  //       if (!value) return [null];
  //       return this.tickerSymbolService.getTickerSymbols(value);
  //     })
  //   );
  // }

  onInputChange(value:string) {
    this.value$.next(value.toUpperCase())

    // TEMPORARY
    // this.loadingState = this.value$.pipe(
    //   debounceTime(300),
    //   switchMap((value) => {
    //     if (!value) return [null];
    //     return this.tickerSymbolService.getTickerSymbols(value);
    //   })
    // );
  }

  //Extending ngModel directive to use observables
  //https://stackoverflow.com/questions/38844835/extending-angular-2-ngmodel-directive-to-use-observables
}
