import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormControlName, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

  constructor(private element : ElementRef , private formgroup : FormGroupDirective) {

    formgroup


   }



   @HostListener("keyup") onchange(){

    const element  = this.element.nativeElement;
    const formGroup = this.formgroup;
    const controls : Array<FormControlName> = formGroup.directives;






    if(controls){
      controls.forEach((control:FormControlName , index : number)=>{

          if(control.hasError('required')){
            if( control.invalid && (control.dirty || control.touched)){
              let field = document.getElementById(control.name as string);
              const childrens : NodeList | undefined = field?.childNodes;
              let div = document.createElement("div");
              div.id = `${control.name}-${String(index)}`
              div.innerText = `${control.name} is required`;
              field?.append(div);
              console.log(control.name);
              console.log(field);

              if(childrens){

                childrens.forEach((child:any)=>{
                  console.log("child " , child);
                });

              }



            }
          }
          // else{
          //   let field = document.getElementById(`${control.name}-${String(index)}`);
          //   field?.removeChild(field);
          // }

      });
    }

   }


   checkValidate(changes : any){
    console.log(changes);
   }




}

