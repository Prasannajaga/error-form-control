import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorConfig } from 'error-control';
import { DEFAULT_ERRORS } from 'projects/error-control/src/Constants';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent {


  personForm !: FormGroup;
  Errors : Array<ErrorConfig> = DEFAULT_ERRORS;
  CONTROL_NAME: string = "";
  ERROR_TYPE: string = "";

  constructor(private formbuilder : FormBuilder){}

  ngOnInit(): void {
    this.personForm =  this.formbuilder.group({
      name : ["" , [Validators.required , Validators.minLength(4), Validators.maxLength(10)]],
      email : [""],
      dob : [""],
      age : ["" ,[ Validators.required , Validators.maxLength(10)]],
      skills : this.formbuilder.array([]),
      people : this.formbuilder.array([])
    });
  }

  get skillArr() {
   return this.personForm.get('skills') as FormArray;
  }

  get skillArrControl() {
   return (this.personForm.get('skills') as FormArray).controls;
  }

  returnFields() : FormGroup {
    return this.formbuilder.group({
      skill : ['' , [Validators.required , Validators.minLength(10)]],
      experience  : [''],
    });
  }

  addSkills(){
    this.skillArr.push(this.returnFields());
  }

  remove(i : number){
    this.skillArr.removeAt(i);
  }

  get pplArr() {
    return this.personForm.get('people') as FormArray;
   }

  get pepoleArrControl() {
   return (this.personForm.get('people') as FormArray).controls;
  }

  returnPplFields() : FormGroup {
    return this.formbuilder.group({
      name : ['' , [Validators.required , Validators.minLength(10)]],
      address  : [''],
    });
  }

  addPpl(){
    this.pplArr.push(this.returnPplFields());
  }

  removeppl(i : number){
    this.pplArr.removeAt(i);
  }

}
