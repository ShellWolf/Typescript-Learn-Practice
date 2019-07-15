
// 利用 strictNullChecks: true 监控返回值为undefined时，报错提示
interface Square {
  kind: "square", // 这个就是具有辨识性的属性
  size: number,
}

interface Rectangle {
  kind: "rectangle",
  height: number,
  width: number,
}

interface Circle {
  kind: "circle",
  radius: number,
}

interface Triangle {
  kind: "triangle",
  bottom: number,
  height: number,
}

type Shape = Square | Rectangle | Circle | Triangle // 组成一个可联合标识
function getArea(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius ** 2; // ** 是求幂运算
    case 'triangle':
      return s.bottom * s.height / 2;
    default:
      return assertNever(s)
  }
}

// 使用never 类型， 主动捕捉，运行时报错
function assertNever (value: never): never {
  throw new Error('unexpected object: ' + value)
}
