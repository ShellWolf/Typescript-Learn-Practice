var Validation;
(function (Validation) {
    Validation.isLetterReg = /^[A-Za-z]+$/;
    Validation.checkLetter = function (text) {
        return Validation.isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
var Validation;
(function (Validation) {
    Validation.isNumberReg = /^[0-9]+$/;
    Validation.checkNumber = function (text) {
        return Validation.isNumberReg.test(text);
    };
})(Validation || (Validation = {}));
// /// <reference path="./validation.ts" />
/// <reference path="./letterValidation.ts" />
/// <reference path="./numberValidation.ts" />
// import { Validation } from './validation'
var isLetter = Validation.checkLetter('wolf');
var reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);
