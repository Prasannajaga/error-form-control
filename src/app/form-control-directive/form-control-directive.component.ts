import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-control-directive',
  templateUrl: './form-control-directive.component.html',
  styleUrls: ['./form-control-directive.component.scss']
})
export class FormControlDirectiveComponent implements OnInit {

  personForm !: FormGroup;

  constructor(private formbuilder : FormBuilder){}

  ngOnInit(): void {
    this.personForm =  this.formbuilder.group({
      name : ["" , Validators.required],
      email : ["" , Validators.required],
      age : [""]
    });
  }









}
