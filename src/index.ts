import * as ClassTsPractice from './class/index'
import * as FunctionPractice from './compatibility/index'
import * as ThisAndType from './thisAndType/index'
import * as MapType from './mapType/index'
import * as Decorators from './decorators/index'

const h1 = document.createElement('h1')

const point  = new ClassTsPractice.Point(2,3)
point.getPosition()

const getNum = FunctionPractice.getNum

const counter = new ThisAndType.Counter(1)

const proxify = MapType.proxify

const deco =  Decorators.A

h1.innerHTML = `Hello, ShellWolf, Let's Do It.`

document.body.appendChild(h1)
