import { Directive, HostListener, inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { controlModule } from './controlModule';
import { ErrorService } from './errorService';

@Directive({
  selector: '[libArrayControl]',
  exportAs: 'arrayControl',
  inputs: ['errors'],
})
export class ArrayControlDirective implements controlModule{

  errorService = inject(ErrorService);

  constructor(private formGroupDirective : FormGroupDirective) { }



  ngOnInit(){
      console.log(this.formGroupDirective);
  }


  @HostListener('keyup', ['$event']) onchange(event: any) {
    const form : FormGroup = this.formGroupDirective.form;

    if(form){
      Object.keys(form.controls).forEach(x =>{
        const d = form.get(x);
        if(d instanceof FormArray){
            this.updateFormArray(d);
        }
      });
    }

  }

  updateFormArray(d: FormArray<any>) {
    if(d){
      d.controls.forEach((x : any, controlIndex : number) =>{
        const keys = Object.keys((<FormGroup>x).controls).map(x => x);
        if(keys && keys.length > 0){

          keys.forEach((fc : any , i : number) =>{
            const control :  AbstractControl<any, any> | null= x.get(fc);
            const controlHasErrors = (control && control.errors && Object.keys(control.errors).length > 0);
            const focusedEle = document.getElementById(this.getIdFormat(fc , controlIndex));

            if(control && controlHasErrors ){

              if(control.invalid && (control.touched || control.dirty)){

                if(focusedEle === null){
                  console.log("Already Checked " , focusedEle , control);
                  this.handleErrorTypes(control , fc , controlIndex);
                }
                else if(controlHasErrors && focusedEle != null){
                  focusedEle.remove();
                  this.handleErrorTypes(control , fc , controlIndex);
                }

              }
              // else if(errors > 1){
              //   console.log("more than onee");
              // }

            }
            else if(!controlHasErrors){
              focusedEle?.remove();
            }


          });

        }
      });
    }
  }

  handleErrorTypes(control: any, name : string , index : number) {
    const id = `${name}-${index}`;
    const form = document.getElementById(id);

    if (control && control.errors) {
      Object.keys(control.errors).map((type: string) => {
        const div = this.createErrorElement(type , this.getIdFormat(name , index));
        form?.parentNode?.insertBefore(div , form.nextSibling);
      });
    }
  }

  createErrorElement(type: string , id : string): HTMLDivElement {
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
      div.id = id;
      div.setAttribute("errorType" , type);
      div.innerHTML = error.message;
    }
    return div;
  }

  getIdFormat(d  : string , i : number) : string {
    return `${d}-${i}-${i + 1}`;
  }



  addError(d: any): void {
    throw new Error('Method not implemented.');
  }
  addErrors(d: Array<any>): void {
    throw new Error('Method not implemented.');
  }
  removeError(d: any): void {
    throw new Error('Method not implemented.');
  }
  removeErrors(d: Array<any>): void {
    throw new Error('Method not implemented.');
  }

}
