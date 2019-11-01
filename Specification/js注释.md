# js注释规范

## JSDOC
VS Code支持JSDOC的大部分标准注释规范，使用JSDOC注释规范能够为VS Code带来更加友好的代码提示功能。

[JSDoc 3](https://jsdoc.app/)是类似于Javadoc和phpDocumentor的JavaScript的API文档自动生成工具，我们在代码中直接编写文档注释信息，使用JSDoc工具能够自动的扫描代码并生成对应的HTML接口信息文档。
> 所有的文档注释都是以/**开始的
```js
/** This is a description of the foo function. */
function foo() {
}

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```
JSDoc使用到的常用类型有：
* Object 对象
* Array 数组
* string 字符串
* number 数字
* Object[] 数组对象
* string[] 普通字符串对象

### @param(synonyms: @arg, @argument) 传递给函数的参数描述
`@param`标识函数参数的名称、类型和描述信息，其中名称是必须的
```js
/**
 * @param somebody
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}

/**
 * @param {string} somebody
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}

/**
 * @param {string} somebody Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
// 在描述信息的前后也可以添加一个连字符号
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```

如果参数是复杂的Object类型或者是对象的解构方式，我们可以写成：
```js
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function(employee) {
    // ...
};
```

如果参数是数组对象
```js
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
Project.prototype.assign = function(employees) {
    // ...
};
```

可选参数
```js
// An optional parameter
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}
// An optional parameter and default value
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}
```

### @returns(synonyms: @return) 函数返回值描述
```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @param {boolean} retArr If set to true, the function will return an array
 * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
}

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {Promise} Promise object represents the sum of a and b
 */
function sumAsync(a, b) {
    return new Promise(function(resolve, reject) {
        resolve(a + b);
    });
}
```