// 类型别名
// 当无法通过接口，并且需要使用联合类型或元祖类型，用类型别名

type TypeString<T> = T;
let str1: TypeString<string>
str1 = '12'

let str2: TypeString<string | number>[] = [12, '23']

// type Child = Child[]

type Child<T> = {
  current: string,
  child?: Child<T>
}

let csc: Child<string> = {
  current: 'dw',
  child: {
    current: 'wf',
  }
}

type Alias = {
  num: number
}

interface Interface {
  num: number
}

let _alias: Alias = {
  num: 123
}

let _interface: Interface = {
  num: 456
}

_alias = _interface
_interface = _alias

// 字面量类型

// 字符串字面量类型
type Name = "lilo" | "wolf" | "dw"
const name1: Name = "lilo"
// const name2: Name = "hah"

// 数字字面量类型
type Age = 19
interface Info {
  name: string,
  age?: Age,
}

const info1: Info = {
  name: 'dw',
  // age: 28,
}

// classic logic example
function getValue(index: number) {
  // if (index !==0 || index !== 1) {}
}
