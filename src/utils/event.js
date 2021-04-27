/**
 * 事件类
 */
export class Event {
  constructor() {
    this.events = {}
  }
  on(event, callback) {
    let callbacks = this.events[event] || []
    callbacks.push(callback)
    this.events[event] = callbacks
    return this
  }
  off(event, callback) {
    let callbacks = this.events[event]
    this.events[event] = callbacks && callbacks.filter((fn) => fn !== callback)
    return this
  }
  emit(...args) {
    const event = args[0]
    const params = [].slice.call(args, 1)
    const callbacks = this.events[event]
    callbacks.forEach((fn) => fn.apply(this, params))
    return this
  }
  once(event, callback) {
    let wrapFn = (...args) => {
      callback.apply(this, args)
      this.off(event, wrapFn)
    }
    this.on(event, wrapFn)
    return this
  }
}
