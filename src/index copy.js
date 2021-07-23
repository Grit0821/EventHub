// 发布订阅模式(事件中心) js版本
// 三个功能 ：发布 on，订阅 emit，取消 off
class EventHub {
  cache = {} 
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [] // 初始化
    this.cache[eventName].push(fn) // 一个发布可以有多个事件
  }
  emit(eventName, data?) {
    this.cache[eventName] && this.cache[eventName].forEach(fn => {
      fn(data)
    });
  }
  off(eventName, fn) {
    // 把 fn 从 eventName 对应的数组里删除掉
    this.cache[eventName] = this.cache[eventName] || []
    let index = this.cache[eventName].indexOf(fn)
    // let index = indexOf(this.cache[eventName], fn)
    index !== -1 && this.cache[eventName].splice(index , 1)
  }
}


// 可以用来替代 arr.indexOf(), 该方法兼容性不好
/**
 * 
 * @param arr 
 * @param item 
 * @returns 
 */
function indexOf(arr, item ){
  let index = -1
  for(let i =0 ; i< arr.length; i++){
    if(arr[i] === item){
      index = i
      break
    }
  }
  return index
}

export default EventHub