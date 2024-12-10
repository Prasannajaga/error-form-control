import { DEFAULT_ERRORS } from "./Constants";
import { ErrorConfig } from "./error-control-directive";



export class ErrorService {

  errors = DEFAULT_ERRORS;

  constructor(){}


  setErrors(d : any){
    this.errors = d;
  }


  getTextBasedOnErrorTypes(val: string): ErrorConfig {
    if (this.errors && this.errors.length > 0) {
        const isValid = this.errors.find(
          (data: ErrorConfig) => data.type.toLowerCase() === val.toLowerCase()
        );

        if (isValid) {
          return isValid;
        } else throw new Error('errortype not found');
    }
    else {
      throw new Error('given ErrorArr is undefined');
    }
  }



}
