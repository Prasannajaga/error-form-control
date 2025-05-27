# ps-error-control

A lightweight directive for handling Reactive Forms validation in Angular applications. Simplify form error handling with the `errorControl` and `arrayControl` directives.

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
  - [Step 1: Initialize FormGroup](#step-1-initialize-formgroup)
  - [Step 2: Add errorControl Directive](#step-2-add-errorcontrol-directive)
- [Form Array Handling](#form-array-handling)
- [Customization](#customization)
- [Example](#example)
- [GitHub Repository](#github-repository)

## Installation

Install the package via npm:

```bash
npm install ps-error-control
```

Import the module in your Angular application:

```ts
import { ErrorControlModule } from 'ps-error-control';

@NgModule({
  imports: [
    ErrorControlModule,
    // other imports
  ],
})
export class AppModule {}
```

## Basic Usage

### Step 1: Initialize FormGroup

In your component, create a `FormGroup` using Angular's `FormBuilder`. Define the form controls with the desired validators.

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  detailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.maxLength(4)]],
    });
  }
}
```

### Step 2: Add errorControl Directive

In your template, apply the `errorControl` directive to the form element. Ensure each input's `id` matches its `formControlName`.

```html
<form [formGroup]="detailForm" errorControl>
  <div>
    <label for="name">Name</label>
    <input id="name" type="text" formControlName="name">
  </div>
  <div>
    <label for="age">Age</label>
    <input id="age" type="text" formControlName="age">
  </div>
</form>
```

**Note**: The `id` attribute of each input must match the corresponding `formControlName` for the directive to work correctly.

## Form Array Handling

To handle validation errors in a `FormArray`, use the `arrayControl` directive. Ensure each input's `id` follows the format `formControlName-index`.

### Example

```html
<div arrayControl #data="arrayControl" [errors]="errors" formArrayName="skills">
  <div *ngFor="let skill of skillArrControl.controls; let i = index" [formGroupName]="i">
    <div>
      <input id="skill-{{i}}" type="text" formControlName="skill">
    </div>
    <div>
      <input id="experience-{{i}}" type="text" formControlName="experience">
    </div>
    <button (click)="remove(i)">Remove</button>
  </div>
</div>
```

**Note**: Error messages will be rendered as the next sibling of the respective `formControlName` input.

### Component Code for FormArray

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  detailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      skills: this.formBuilder.array([]),
    });
  }

  get skillArrControl(): FormArray {
    return this.detailForm.get('skills') as FormArray;
  }

  addSkill(): void {
    const skillGroup = this.formBuilder.group({
      skill: ['', Validators.required],
      experience: ['', Validators.required],
    });
    this.skillArrControl.push(skillGroup);
  }

  remove(index: number): void {
    this.skillArrControl.removeAt(index);
  }
}
```

## Customization

Customize error messages and styles by passing a modified error configuration array to the `errorControl` or `arrayControl` directive.

### Default Error Configuration

```ts
const errors: Array<ErrorConfig> = [
  {
    type: 'required',
    message: 'This field is required',
    style: {
      color: 'red',
    },
  },
  {
    type: 'minlength',
    message: 'Minimum length required',
    style: {
      color: 'red',
    },
  },
  {
    type: 'maxlength',
    message: 'Exceeds maximum length',
    className: 'error-text',
    style: {
      color: 'red',
    },
  },
  {
    type: 'pattern',
    message: 'Invalid format',
    style: {
      color: 'red',
    },
  },
];
```

Pass the custom error array to the directive:

```html
<form [formGroup]="detailForm" errorControl [errors]="errors">
  <!-- form fields -->
</form>
```

### ErrorConfig Interface

```ts
interface ErrorConfig {
  type: string;
  message: string;
  className?: string;
  style?: { [key: string]: string };
}
```

Modify the `errors` array to customize messages, CSS classes, or inline styles based on your application's needs.

## Example

### Complete Component Template

```html
<form [formGroup]="detailForm" errorControl [errors]="errors">
  <div>
    <label for="name">Name</label>
    <input id="name" type="text" formControlName="name">
  </div>
  <div>
    <label for="age">Age</label>
    <input id="age" type="text" formControlName="age">
  </div>
  <div arrayControl #data="arrayControl" [errors]="errors" formArrayName="skills">
    <div *ngFor="let skill of skillArrControl.controls; let i = index" [formGroupName]="i">
      <div>
        <input id="skill-{{i}}" type="text" formControlName="skill">
      </div>
      <div>
        <input id="experience-{{i}}" type="text" formControlName="experience">
      </div>
      <button (click)="remove(i)">Remove</button>
    </div>
    <button (click)="addSkill()">Add Skill</button>
  </div>
</form>
```

### Complete Component Code

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  detailForm!: FormGroup;
  errors: Array<ErrorConfig> = [
    {
      type: 'required',
      message: 'This field is required',
      style: { color: 'red' },
    },
    {
      type: 'minlength',
      message: 'Minimum length required',
      style: { color: 'red' },
    },
    {
      type: 'maxlength',
      message: 'Exceeds maximum length',
      style: { color: 'red' },
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required, Validators.maxLength(4)]],
      skills: this.formBuilder.array([]),
    });
  }

  get skillArrControl(): FormArray {
    return this.detailForm.get('skills') as FormArray;
  }

  addSkill(): void {
    const skillGroup = this.formBuilder.group({
      skill: ['', Validators.required],
      experience: ['', Validators.required],
    });
    this.skillArrControl.push(skillGroup);
  }

  remove(index: number): void {
    this.skillArrControl.removeAt(index);
  }
}

interface ErrorConfig {
  type: string;
  message: string;
  className?: string;
  style?: { [key: string]: string };
}
```
## Contribution

We welcome contributions to `ps-error-control`! To contribute:

1. **Fork the Repository**: Create a fork of the project on GitHub.
2. **Clone and Set Up**: Clone your fork and install dependencies using `npm install`.
3. **Make Changes**: Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature`).
4. **Test Your Changes**: Ensure your changes work and do not break existing functionality.
5. **Submit a Pull Request**: Push your branch to your fork and create a pull request with a clear description of your changes.

Please follow the Code of Conduct and ensure your code adheres to the project's coding standards.

For bug reports or feature requests, open an issue on the GitHub repository.

## GitHub Repository

For more details, source code, and updates, visit the [GitHub repository](https://github.com/Prasannajaga/error-form-control.git).


---

Made with ❤️ by the [@Prasanna](https://github.com/Prasannajaga).
