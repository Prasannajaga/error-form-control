# ErrorControl

Handle your Reactive forms validation with ps-error-control.

## Example

1 . Initialize your formGroup

2 . define the errorControl in place where you mention the Formgroup Element;

Note : Make sure to add the id to your input element same as your formControlName

it will take care of the validatio and it will render the error element next to your input element.

That's it , it's easy as that


component.html 

````html
 <form [formGroup]="detailForm" errorControl >

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


## Customization 


````ts
// The default errors looks like this, feel free to modify the array based on your needs. 

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
 

````html 
<!-- make sure to pass the modified array as input. like this in your component -->

 <form [formGroup]="detailForm" errorControl [errors]="yourModifiedArray">
 </form>

````

## Github
[github](https://github.com/Prasannajaga/error-form-control.git)  [linkedin](https://www.linkedin.com/in/prasanna-jaga-46227b260/)   [twitter](https://twitter.com/jaga_prasanna)
