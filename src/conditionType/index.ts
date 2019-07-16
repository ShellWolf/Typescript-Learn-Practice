import { y } from "../compatibility";

/**
 * 条件类型 - Practice
 */

// 基础使用
type Type<T> = T extends string ? string : number
const index: Type<'a'> = ''
const index2: Type<false> = 1

// 分布式条件类型
type TypeName<T> = T extends string ?
 string :
 T extends number ?
 number :
 T extends boolean ?
 boolean :
 T extends undefined ?
 undefined :
 T extends Function ?
 Function :
 object;

type Type1 = TypeName<() => void>
type Type2 = TypeName<string[]>
type Type3 = TypeName<(() => void) | string[]>

// 找出从 T 中 除去 U 中存在的类型, 有一个内置的预定义条件类型 Exclude<T, U> 可以实现同样的功能
type Diff<T, U> = T extends U ? never : T
// Test 的类型为 string | boolean
type Test = Diff<string | number | boolean, undefined | number>

// 条件类型结合映射类型
type TypeO<T> = { [K in keyof T]: T[K] extends Function ? K : never}[keyof T]
interface Part {
  id: number,
  name: string,
  subparts: Part[],
  updatePart(newName: string): void,
}
type TestO = TypeO<Part>
// const a: TestO = 1

// 条件类型的类型推断 - infer
type TypeP<T> = T extends any[] ? T[number] : T
type t1 = TypeP<number[]>
type t2 = TypeP<string>

// 利用 infer 改写上面例子
type TypeF<T> = T extends Array<infer U> ? U : T
type t11 = TypeF<number[]>
type t21 = TypeF<string>

// 预定义条件类型

// - Exclude<T, U> 找出从 T 中 除去 U 中存在的类型
type TypeExclude = Exclude<"a" | "b" | "c", "a">

// - Extract<T, U> 选取 T 中 可以赋值给 U的类型
type TypeExtract = Extract<"a" | "b" | "c", "a" | "c" | "f">

// - NonNullable<T> 从 T 中去掉 null 和 undefined
type TypeNull = NonNullable<string|number|undefined|null>

// - ReturnType 获取函数类型返回值类型
type TypeFn = ReturnType<() => string>

// - InstanceType 获取构造函数类型的实例类型
type InstanceType<T extends new(...args: any[]) => any> =
T extends new(
  ...args: any[]
) => infer R ? R : any;

class A { constructor() {} }
type T1 = InstanceType<typeof A>
type T2 = InstanceType<any>
type T3 = InstanceType<never>
// type T4 = InstanceType<string>
// type T5 = InstanceType<unknown>
