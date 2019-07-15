// Basic Practice & 修饰符 public
export class Point {
  constructor(public x: number = 1, public y?: number) {
    this.x = x;
    this.y = y;
  }

   public getPosition() {
    console.warn(`current position: ${this.x}, ${this.y}`);
  }
}

// 修饰符 protected
export class Parent {
  protected age: number;
  public readonly name: string;
  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }

  protected getAge () {
    return this.age
  }
}

const p = new Parent(18, 'xm')
console.log(p.name)

export class Children extends Parent {
  constructor(age: number, name: string) {
    super(age, name);
    console.log(super.getAge())
  }
}

// 存取器
export class UserInfo {
  private _fullName: string;
  constructor() {};

  public get fullName () {
    return this._fullName;
  }

  public set fullName (name: string) {
    this._fullName = name
  }
}

const user = new UserInfo()
user.fullName = 'dw'
console.log(user.fullName)

// 抽象类
abstract class People {
  constructor (public name: string) {}
  public abstract printName(): void
}

class Man extends People {
  constructor (name: string) {
    super(name)
    this.name = name
  }

  public printName () {
    console.log(this.name)
  }
}

const man = new Man('dw-s')
man.printName()

// 类类型接口
interface FoodInterface {
  type: string;
}

class FoodClass implements FoodInterface {
  constructor(public type: string) {}
  public static type: string
}

// 接口继承类
class A {
  protected name: string
}

interface I extends A {}

// class B implements I {}

// class C implements I {
//   public name: string
// }

class D extends A implements I{
  public getName() {
    return this.name
  }
}

// 在泛型中使用类类型
const create = <T>(c: {new (): T}):T => {
  return new c()
}

class Info {
  public age: number
}

console.log(create(Info).age)
// console.log(create(Info).name)

// 类型推论
// let name = "21"
// name =12

// 多类型联合
// let arr = [1, '2']
// arr =  ['2',3, false, 4]

// 上下文类型
// window.onmousedown = function(mouseEvent) {
//   return mouseEvent.a
// }
