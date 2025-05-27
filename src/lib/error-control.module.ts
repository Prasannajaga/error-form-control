import { NgModule } from '@angular/core';
import { ErrorControlDirective } from '../error-control-directive';
import { ArrayControlDirective } from '../array-control.directive';
import { ErrorService } from '../errorService';



@NgModule({
  declarations: [
    ErrorControlDirective,
    ArrayControlDirective,
  ],
  imports: [
  ],
  exports: [
    ErrorControlDirective,
    ArrayControlDirective
  ],
  providers : [
    ErrorService
  ]
})
export class ErrorControlModule { }
