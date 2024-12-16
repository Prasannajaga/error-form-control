# ErrorControl

Handle your Reactive forms validation with ps-error-control.

## Example

Step 1 => Initialize your formGroup;


Step 2 => define the errorControl in place where you mention the Formgroup Element;

**Note : Make sure to add the id to your input element same as your formControlName**

That's it , it will take care of the validation for you. 

component.html 

````html
 <form [formGroup]="detailForm" errorControl>

    <div >
      <label for="">Name </label>
      <input id="name" type="text" formControlName="name">
    </div> 

    <div>
      <label for="">Age </label>
      <input id="age" type="text" formControlName="age">
    </div> 

  </form>

````

component.ts 

````ts
export class App{

 form !: FormGroup;
 constructor(private formbuilder : FormBuilder){}

  ngOnInit(): void {
    this.detailForm =  this.formbuilder.group({
      name : ["" , [Validators.required , Validators.minLength(4) ]], 
      age : ["" ,[ Validators.required , Validators.maxLength(4) ]]
    });
  }

}

```` 



make sure you pass the modified array as input. like this in your component


````html 
 <form [formGroup]="detailForm" errorControl [errors]="yourModifiedArray">
 </form>

````


## Form Array Handling 

use arrayControl directive to handle your formArray errors 

**Note** : make sure you add "formControlName-index" to handle the FormValidation efficiently

error elememnt will be rendered on the nextSibling of respective formContorlName

```html 

    <div arrayControl #data="arrayControl" [errors]="Errors" formArrayName="skills">
      <div *ngFor="let skill of skillArrControl; let i = index" >
        <div [formGroupName]="i">
          <div><input id="skill-{{i}}" type="text" formControlName="skill"></div>
          <div><input id="experience-{{i}}" type="text" formControlName="experience"></div>
          <button (click)="remove(i)">remove</button>
        </div>
      </div>
    </div>

```


## Customization 

````ts
// The default errors looks like this

// feel free to modify the array based on your needs

const err : Array<ErrorConfig> = [
    {
     type : "required",
     message : "field is required" , 
     style : {
       "color" : "red"
     }
   },
   {
     type : "maxLength",
     message : "exceeds the limit",
     className : "red",
     style : {
       "color" : "red"
     }
   },
   {
     type : "minLength",
     message : "Minimum required",
     style : {
       color : "red"
     }
   },
   {
     type : "pattern",
     message : "invalid type",
     style : {
       "color" : "red"
     }
   }
  ]; 

````
  
## Github
[github](https://github.com/Prasannajaga/error-form-control.git).
