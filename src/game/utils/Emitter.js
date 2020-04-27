import EventEmitter from "events";

class Emitter extends EventEmitter {
  emitEvent(eventName, eventMessage) {
    this.emit(eventName, eventMessage);
  }
  listen(eventName, callback) {
    this.on(eventName, callback);
  }
}

export const emitter = new Emitter();
