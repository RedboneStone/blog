### 基础用法

Basic usage involves defining a descriptor, assigning it to a schema and passing the object to be validated and a callback function to the validate method of the schema:

1. 定义一个descriptor
2. 将descritor 分配给  schema
3. 并将需要验证的数据 和 回调函数 传入schema的validate方法

```js
import schema from 'async-validator';
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
var validator = new schema(descriptor);
validator.validate({name: "muji"}, (errors, fields) => {
  if(errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    return handleErrors(errors, fields);
  }
  // validation passed
});

// PROMISE USAGE
validator.validate({ name: "muji", age: 16 }).then(() => {
  // validation passed or without error message
}).catch(({ errors, fields }) => {
  return handleErrors(errors, fields);
})
```



### validate方法

```js
function(source ,[options], callback): Promise
- source : required
- callback : required
- options: optional
```



### Rules

Rules是执行验证的函数

```js
function(rule, value, callback, source, options)
```

