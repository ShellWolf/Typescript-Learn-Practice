/**
 * 类型兼容性 Practice
 */

// 函数参数个数 && 函数参数类型
export let x = (a: number) => 0;
export let y = (b: number, c: string) => 0;
export let z = (d: string) => false;
export let h = (e: string) => 0;

// y = x

// x = y
// x = z
// x = h

// 剩余参数 和 可选参数
export const getNum = (
  arr: number[],
  cb: (arg1: number, arg2?: number) => number
  ): number => {
  return cb(arr[0], ...arr)
}

export const cc = getNum(
  [1,2],
  (...args: number[]):number => {return args.length}
)

console.log(cc)

// 函数参数双向协变
let fn1 = function(arg: number | string): void {};
let fn2 = function(arg: number): void {};

fn1 = fn2
fn2 = fn1

// 函数返回值类型
const x1 = (a: number): string | number => 0
const y1 = (b: number) => 'a'
const z1 = (c: number) => false

// x1 = y1
// x1 = z1

// 函数重载
function merge(arg1: number, arg2: number): number
function merge(arg1: string, arg2: string): string
function merge(arg1: any, arg2: any): any {
  return arg1 + arg2
}

function sum(arg1: number, arg2: number): number
function sum(arg1: any, arg2: any): any {
  return arg1 + arg2
}

const fnc = merge
// fnc = sum

// 枚举
enum Status {
  On,
  Off
}

enum Color {
  White,
  Black
}

enum Status1 {
  On = 'on',
  Off = 'off'
}

let s = Status.On
s = 1
s = 2
// s = Color.Black

const s1 = Status1.On
// s1 = 'LIlil'

// 类 -基本比较
class Animal {
  public static age: number;
  constructor(public name: string) {}
}

class People {
  public static age: string;
  constructor(public name: string) {}
}

class Food {
  constructor(public name: number) {}
}

let a: Animal;
let p: People;
let f: Food;

p = new People('p')
a = p // 类类型比较兼容性时，只比较实例的成员
// a = f

// 类的私有成员和受保护成员
class Parent {
  private age: number;
  constructor() {}
}

class Children extends Parent {
  constructor() {
    super()
  }
}

class Other {
  private age: number;
  constructor() {}
}

const children: Parent = new Children()
// const other: Parent = new Other()

class Parent1 {
  protected age: number;
  constructor() {}
}

class Children1 extends Parent {
  constructor() {
    super()
  }
}

class Other1 {
  protected age: number;
  constructor() {}
}

// const children1: Parent1 = new Children1()
// const other1: Parent1 = new Other1()

// 泛型
interface Data<T> {}
let data1: Data<number>
let data2: Data<string>

data2 = 's'
data1 = data2
data2 = data1

interface Data1<T> {
  data: T
}
let data3: Data1<number>
let data4: Data1<string>

// data3 = data4
// data4 = data3
