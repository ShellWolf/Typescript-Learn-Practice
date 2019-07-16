// /// <reference path="./validation.ts" />
/// <reference path="./letterValidation.ts" />
/// <reference path="./numberValidation.ts" />

// import { Validation } from './validation'

const isLetter = Validation.checkLetter('wolf')
const reg =  Validation.isNumberReg
console.log(isLetter);
console.log(reg);

namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Square {}
  }
}

// 别名练习
// - 使用 import 关键字 给 Shape.Polygons 取一个别名 polygons
import polygons = Shapes.Polygons
let sq = new polygons.Square()
