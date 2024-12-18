import {
  Directive,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControlName, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { DEFAULT_ERRORS } from './Constants';
import { ArrayControlDirective } from './array-control.directive';
import { ErrorService } from './errorService';

export type ErrorConfig = {
  type: string;
  message: string;
  name?: string;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
};

@Directive({
  selector: '[errorControl]',
  exportAs: 'errorControl',
  inputs: ['errors'],
})
export class ErrorControlDirective {
  errors: Array<ErrorConfig> =  DEFAULT_ERRORS;

  private activeElement !: string;
  errorService = inject(ErrorService);
  errorFiels: Array<any | string> = [];
  @ViewChild(ArrayControlDirective , { static : true }) arrayControlDirective !: ArrayControlDirective;

  constructor(
    private formgroup: FormGroupDirective,
  ) {


  }

  @HostListener('keyup', ['$event']) onchange(event: any) {

    const focusedName = event.target.getAttribute('formcontrolname');
    const controls: Array<FormControlName> = this.formgroup.directives;

    if (controls) {
      controls.forEach((control: FormControlName, index: number) => {

        const formArr = control.control.parent?.parent;
        // if the control is formArray restrict and break here
        if(formArr instanceof FormArray){
          return;
        }

        const { errors, invalid, name, touched, dirty } = control;
        let controlHasErrors = false;
        if (errors) {
          controlHasErrors = Object.keys(errors).length > 0 ? true : false;
        }

        // 1 . render Error element if it was the first time
        if (!this.errorFiels.includes(name) && controlHasErrors) {
          if (invalid && (touched || dirty)) {
            this.errorFiels.push(name);
            this.handleErrorTypes(control, index);
          }
        }
        // 2 . if rendered error element is valid clear the element
        else if (!controlHasErrors && this.errorFiels.includes(name)) {
          this.removeFields(this.errorFiels.indexOf(name));
          this.removeElement(control);
        }
        // 3 . if control has mutiple validators aonther error showing up clear the last error and render the new one
        else if (
          controlHasErrors &&
          this.errorFiels.includes(name) &&
          focusedName === name
        ) {
          this.removeElement(control);
          this.handleErrorTypes(control, index);
        }

      });
    }
  }

  getIdFormat({ name }: FormControlName): string {
    return `${name}-${name?.toString().length}`;
  }

  handleErrorTypes(control: FormControlName, index ?: number) {
    const form = document.getElementById(control.name as string);
    if (control && control.errors) {
      Object.keys(control.errors).map((type: string) => {
        const div = this.createErrorElement(control, type);
        form?.parentNode?.insertBefore(div , form.nextSibling);
      });
    }
  }

  createErrorElement(control: FormControlName, type: string): HTMLDivElement {
    const div = document.createElement('div');
    const error = this.errorService.getTextBasedOnErrorTypes(type);
    if(error){
      div.className = error.className || 'red';
      let style  = error.style;
      if(style){
        Object.keys(style as any).forEach((property:any) => {
          property = property as CSSStyleDeclaration;
          if(style){
            div.style[property] = style[property] as string;
          }
        });
      }
      div.id = this.getIdFormat(control);
      div.innerHTML = error.message;
    }
    return div;
  }


  getFormControlByName(name: string): FormControlName | any {
    const controls = this.formgroup.directives.find(
      (val: FormControlName) => val.name?.toString().toLowerCase() === name
    );
    return controls ? controls : undefined;
  }


  get currentElement(): string {
    return this.activeElement;
  }


  removeFields(index: number) {
    if (this.errorFiels) {
      this.errorFiels.splice(index, 1);
    }
  }

  removeElement(control : FormControlName) {
    const id = this.getIdFormat(control);
    const ele = document.getElementById(id);
    if (ele) {
      ele.remove();
    }
  }

  setValidators(name: string , error : ValidatorFn | ValidatorFn[]) {
    const data : FormControlName = this.getFormControlByName(name);
    console.log(data);
    if (data) {
       data.control.setValidators(error);
       data.control.updateValueAndValidity();
    }
  }

  removeValidators(name: string) {
    const data = this.getFormControlByName(name);
    if (data) {
      let id = this.getIdFormat(data);
      if (id) {
        document.getElementById(id)?.remove();
        this.removeFields(this.errorFiels.indexOf(data.name));
      }
    }
  }

  removeAllValidators() {
    const controls: Array<FormControlName> = this.formgroup.directives;
    if (controls) {
      controls.forEach((con) => {
        const id = this.getIdFormat(con);
        if (id) {
          document.getElementById(id)?.remove();
          con.control.clearValidators();
          con.control.updateValueAndValidity();
        }
      });
    }
  }

  setAllRequiredValidators() {
    const controls: Array<FormControlName> = this.formgroup.directives;
    if (controls) {
      controls.forEach((con) => {
          con.control.setValidators([Validators.required]);
          con.control.updateValueAndValidity();
      });
    }
  }


}
