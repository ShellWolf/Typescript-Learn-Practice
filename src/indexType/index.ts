// 索引类型查询操作符: keyof 连接一个类型，返回一个由这个类型所有属性名组成的联合类型
interface InfoInterface {
  name: string,
  age: number,
}

let infoProp: keyof InfoInterface
infoProp = "name"
infoProp = "age"
// infoProp = "no"

// 结合泛型使用，可以检查使用了动态属性名的代码
export function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(n => {
    return obj[n]
  })
}

const info = {
  name: 'dw',
  age: 22,
}

const Values: string[] = getValue(info, ['name'])
// Values = getValue(info, ['age'])

// 索引访问操作符: [] 可以访问某个属性的类型
type NameType = InfoInterface['name']
const name: NameType = '123'
// const name1: NameType = 123

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] => {
  return o[name]
}

// interface OBJ<T> {
//   [key: number]: T
// }

interface OBJ<T> {
  [key: string]: T
}

let key: keyof OBJ<number> // key 的类型为 number | string
key = 123
key = '123'
