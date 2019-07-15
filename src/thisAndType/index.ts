// this 类型
export class Counter {
  constructor(public count: number = 0) {}

  public add(value: number) {
    this.count += value
    return this
  }

  public substract(value: number) {
    this.count -= value
    return this
  }
}

const counter = new Counter(100)
console.log(counter.count)
counter.add(10).substract(-4)
console.log(counter.count)

export class PowCounter extends Counter {
  constructor(public count: number = 0) {
    super(count)
  }

  public pow(value: number) {
    this.count = this.count ** value;
    return this
  }
}

const powCounter = new PowCounter(2)
powCounter.pow(3).add(10).substract(5)
console.log(powCounter.count)

const info = {
  name: 'dw',
  // 显示指定this 类型
  getName(this: {age: number}) {
    return this // 这里的this的类型是 {age: number}
  }
}

type ObjecteDescription<D, M> = {
  data?: D,
  // ThisType 是一个内置的接口，用来在对象字面量中键入this，
  // 这里指定this的类型为 D & M
  // methods?: M,
  methods?: M & ThisType<D & M>,
}

function makeObject<D, M>(desc: ObjecteDescription<D, M>): D & M {
  const data: object = desc.data || {}
  const methods: object = desc.methods || {}

  return {...data, ...methods} as D & M
}

const obj = makeObject({
  data: {x: 0, y: 0},
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx // 这里的this是通过ThisType<D & M>指定的， this的类型就是 D & M
      this.y += dy
    }
  }
})

console.log(obj)
obj.x = 10
obj.y = 20
obj.moveBy(6, 6)

console.log(obj)
