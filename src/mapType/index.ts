// 使用映射类型得到新的类型

interface InfoOrigin {
  age: number,
  name: string,
  address: string,
}

// 注意新的操作符 in、 TS 内部使用 for...in, 定义映射类型
// + - 符号可以作为前缀来指定增加还是删除修饰符（ + 前缀可以省略）
type ReadOnlyType<T> = { +readonly [P in keyof T]+?: T[P]}
type ReadOnlyInfo = ReadOnlyType<InfoOrigin>

const info: ReadOnlyInfo = {
  age: 18,
}
// info.age = 21

const newInfo: InfoOrigin = {
  name: 'dw',
  age: 18,
  address: 'beijing',
}

// 下面是2个内置的映射类型 Pick 和 Record，实现如下：
// type Pick<T, K extends keyof T> = { [P in K]: T[P] }
// type Record<K extends keyof any, T> = { [P in K]: T }

// 使用内置 Pick 类型
export function pick<T, K extends keyof T>(obj1: T, keys: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>
  keys.forEach(key => {
    res[key] = obj1[key]
  })
  return res
}

const nameAndAddress = pick(newInfo, ['name', 'address'])

// 使用内置 Record 类型，
// - 适用于将一个对象中的每一个属性转化为其他值的场景
export function mapObject<K extends string | number, T, U> (
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  const res = {} as Record<K, U>
  // tslint:disable-next-line:forin
  for(const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

const names = {0: "hello", 1: "world", 2: 'babe'}
const lengths = mapObject(names, s => s.length) // {0: 5, 1:5, 2: 4}

// 由映射类型进行推断
// - 进行逆向操作，拆包
type Proxy<T> = {
  get(): T,
  set(value: T): void,
}

// 将一个对象中所有属性值类型都变为 Proxy<T> 处理后的类型
type Proxify<T> = { [P in keyof T]: Proxy<T[P]> }

export function proxify<T>(obj2: T): Proxify<T> {
  const result = {} as Proxify<T>
  // tslint:disable-next-line:forin
  for (const key in obj2) {
    result[key] = {
      get: () => obj2[key],
      set: value => (obj2[key] = value)
    }
  }
  return result
}

const props = {
  name: 'dw',
  age: 12,
}

const proxyProps = proxify(props)
console.log(proxyProps)
console.log(proxyProps.name.get())
proxyProps.name.set('wf')
console.log(proxyProps.name.get())

// 拆包
export function unproxify<T>(t: Proxify<T>): T {
  const res = {} as T
  for (const key in t) {
    if (t.hasOwnProperty(key)) {
      res[key] = t[key].get()
    }
  }
  return res
}

const originProps = unproxify(proxyProps)

// Required<T> 是一个内置映射类型，可以去掉 T 所有属性的 ? 修饰符

// TS 2.9和之后支持  keyof 和映射类型用 number 和 symbol 命名的属性
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()

type Obj = {
  [stringIndex]: string,
  [numberIndex]: number,
  [symbolIndex]: symbol,
}

// keyof 的例子
type keys = keyof Obj

// const key: keys = 2
const key1: keys = 1
// const key2: keys = '2'
const key3: keys = 'a'
// const key4: keys = Symbol()
const key5: keys = symbolIndex

// 映射类型的例子
const obj: ReadOnlyType<Obj> = {
  a: 'aa',
  1: 12,
  [symbolIndex]: Symbol()
}

// obj.a = 'bb'
// obj[1] = 22
// obj[symbolIndex] = Symbol()

// 元祖和数组上的映射类型
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> }
type Tuple = [number, string, boolean]
type promiseTuple = MapToPromise<Tuple>

const tuple: promiseTuple = [
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve('1')),
  new Promise((resolve, reject) => resolve(true)),
]
