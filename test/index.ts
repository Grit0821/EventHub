import EventHub from "../src/index";

// 如何写测试用例

type TestCase = (message:string) => void

const test1:TestCase = (message) => {
  const eventHub = new EventHub()
  console.assert(eventHub instanceof Object, 'eventHub 是一个对象')
  console.log(message )
}

const test2:TestCase = (message) => {
  // 先发布，后订阅
  const eventHub = new EventHub()
  let called = false
  eventHub.on('xxx', y => {
    called = true
    console.assert(y[0] === '验证信息1')
    console.assert(y[1] === '验证信息2')
  })
  eventHub.emit('xxx', ['验证信息1', '验证信息2'])
  console.assert(called)
  console.log(message)
}

const test3:TestCase = (message) => {
  // 先发布，然后取消，然后订阅
  const eventHub = new EventHub()
  let called = false
  const fn1 = () => {
    called = true
  }
  eventHub.on('yyy', fn1)
  eventHub.off('yyy', fn1)
  eventHub.emit('yyy')
  console.assert(called === false)
  console.log(message)
}

test1('EventHub 可以创建对象')
test2('.on 之后, .emit 触发')
test3('.off 取消生效')

