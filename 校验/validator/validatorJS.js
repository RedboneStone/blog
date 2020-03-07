// import * as schema   from 'async-validator';
const schema = require('async-validator')
// console.log(schema)
var descriptor = {
  name: {
    type: "string",
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  age: {
    type: "number",
    asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value < 18) {
            reject("too young");  // reject with error message
          } else {
            resolve();
          }
        });
      }
  }
};
function handleErrors(errors, fields){
    console.log(errors)
    return
}
var validator = new schema.default(descriptor);
validator.validate({name: 111}, (errors, fields) => {
  if(errors) {
    console.log(errors)
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    return handleErrors(errors, fields);
  }
  // validation passed
});

// PROMISE USAGE
// validator.validate({ name: "muji", age: "aaa" }).then(() => {
//   // validation passed or without error message

// }).catch(({ errors, fields }) => {
//    console.log(errors)
//    return handleErrors(errors, fields);
// })