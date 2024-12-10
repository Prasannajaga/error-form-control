export const DEFAULT_ERRORS = [
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
