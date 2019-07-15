/**
 * 类型保护 Practice
 */

 // 自定义类型保护
const valueList1 = [1, '3']

const getRandomValue = <T>(valueList: T[]) => {
  const number = Math.random() * 10
  if (number < 5) {
    return valueList[0]
  } else {
    return valueList[1]
  }
}

const item = getRandomValue(valueList1)
if ((item as string).length) {
  console.log((item as string).length)
} else {
  console.log((item as number).toFixed(2))
}

// 重点是 value is type 的类型谓语
function isString(value: number | string): value is string {
  return typeof value === 'string'
}

if (isString(item)) {
  console.log(item.length)
} else {
  console.log(item.toFixed(2))
}

/**
 * typeof 类型保护 -
 * type 只能是 number | string | boolean | symbol 四种类型起到保护效果
 */
const valueList2 = [{}, () => {}]
const res = getRandomValue(valueList2)

if (typeof res === 'object') {
  console.log(res.toString())
} else {
  // console.log(res())
}

// instanceof 类型保护
class CreateByClass1 {
  public age = 19
  constructor() {}
}

class CreateByClass2 {
  public name = 'lilo'
  constructor() {}
}

function getRandomItem() {
  if (Math.random() > 0.5) {
    return new CreateByClass1()
  } else {
    return new CreateByClass2()
  }
}

const randomItem = getRandomItem()

if (randomItem instanceof CreateByClass1) {
  console.log(randomItem.age)
} else {
  console.log(randomItem.name)
}

// 在严格模式下 null 和 ndefined 赋值给其它类型值
// -- 相关配置 strictNullChecks: true
let str: string | null | undefined = '12'
str = null
str = undefined

// 可选参数和可选属性
const sum = (x: number, y?:number) => {
  return x+(y||0)
}
sum(5,6)
sum(4)
sum(3,)
sum(2, undefined)
// sum(1,null)

interface PositionInterface {
  a: number,
  b?: number,
}

const position: PositionInterface = {
  a: 12
}

// position.b = 'abc'
position.b = undefined
position.b = 21
// position.b = null

// 显示赋值断言
// ! 表示显示告诉编译器 num 不为 null
function getSpliceStr(num: number | null):string {
  function getLength(prefix: string) {
    return prefix + num!.toFixed().toString()
  }

  num = num || 1.02

  return getLength('dw')
}

getSpliceStr(null)
