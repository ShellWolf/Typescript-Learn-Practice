import anymatch = require("anymatch");

// 装饰器能够作用于 类声明 方法 访问器 属性 参数上
// 装饰器要紧挨着要修饰的内容的前面
// 所有的装饰器不能用作声明文件(.d.ts)中，和任何外部上下文中 (比如 declare)

// 修改类的原型对象和构造函数
function addName(constructor: {new (): any}){
  constructor.prototype.name = 'dw'
}

@addName
export class A {}
export interface A {
  name: string
}

const a = new A()
console.log(a.name)

// 覆盖类里面一些操作
function classDecorator<T extends {new (...args: any[]): {}}> (target: T) {
  return class extends target {
    public newProp = 'new prop'
    public hello = 'override'
  }
}

@classDecorator
export class Greeter {
  public prop = 'prop';
  public hello: string;
  constructor (m: string) {
    this.hello = m
  }
}
console.log(new Greeter('world'));

function enumerable(bool: boolean) {
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ): object {
    return {
      value: function() {
        return 'not age';
      },
      enumerable: bool
    }
  }
}

// 方法装饰器
class InfoC {
  constructor(public age: number) {}

  @enumerable(false)
  public getAge() {
    return this.age
  }
}

const infoc = new InfoC(22)
console.log(infoc);
console.log(infoc.getAge());

// tslint:disable-next-line:forin
for(const propertyName in infoc) {
  console.log(propertyName);
}

// 访问器装饰器
// TS 不允许同时装饰一个成员的 get 和 set 访问器，只需要定义在一个的前面就好
class InfoD {
  private _name: string;
  constructor(name: string) {
    this._name = name
  }

  @enumerable(false)
  public get name() {
    return this._name
  }

  public set name(name) {
    this._name = name
  }
}

// 属性装饰器
function printPropertyName(target: any, propertyName: string) {
  console.log(propertyName)
}

class InfoF {
  @printPropertyName
  public name: string

  @printPropertyName
  public age: number
}

// 参数装饰器
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index + 1}个参数`);
}

class InfoE {
  public name: string = 'dw';
  public age: number = 18;
  public getInfo(prefix: string, @required infoType: string):any {
    return prefix + " " + this[infoType]
  }
}

interface InfoI {
  [key: string]: string | number | Function;
}

const info = new InfoE()
console.log(info.getInfo('hell', 'age'))
