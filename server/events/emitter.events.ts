import { EventEmitter } from "events";

enum EmitterEvents {
    ResetFullCache = "resetFullCache",
}

const myEmitter = new EventEmitter();

export {
    myEmitter,
    EmitterEvents,
};
