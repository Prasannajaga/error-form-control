import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorConfig, ErrorControlDirective } from 'error-control';

@Component({
  selector: 'app-form-control-directive',
  templateUrl: './form-control-directive.component.html',
  styleUrls: ['./form-control-directive.component.scss'],
})
export class FormControlDirectiveComponent implements OnInit {

  personForm !: FormGroup;

  Errors : Array<ErrorConfig> = [
    {
      type : "required",
      message : "this Field is required" ,
      className : 'red',
    },
    {
      type : "maxLength",
      message : "char exceeds the limits",
      className : 'red' ,
      style : {

      }
    },
    {
      type : "minLength",
      message : "Minimum required",
      className : 'yellow' ,
      style : {
        "background" : "yellow",
        "color"  : "red",

      }
    },
    {
      type : "pattern",
      message : "Check this mark",
      className : 'red',
      style : {}
    },
  ];

  CONTROL_NAME: string = "";
  ERROR_TYPE: string = "";

  constructor(private formbuilder : FormBuilder){}

  ngOnInit(): void {
    this.personForm =  this.formbuilder.group({
      name : ["" , [Validators.required , Validators.minLength(4), Validators.maxLength(10)]],
      email : [""],
      dob : [""],
      age : ["" ,[ Validators.required , Validators.maxLength(10)]]
    });
  }

  removeValidators(data : ErrorControlDirective){
    if(this.CONTROL_NAME){
      data.removeValidators(this.CONTROL_NAME);
    }
  }

  setValidators(data : ErrorControlDirective ){
    // this.personForm.get('email')?.setValidators([Validators.maxLength(10)]);
    // this.personForm.get('email')?.updateValueAndValidity();
    data.setValidators('dob' , [Validators.required]);

  }



  remove(data : ErrorControlDirective){
    data.removeAllValidators();
  }

  removeByOne(data : ErrorControlDirective, d : string){
    data.removeValidators(d)
   }




}
