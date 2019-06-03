import { STATUS_KEYBOARD_TARGET_CHANGE, STATUS_SAVE_COMPLETE } from "../actions";

export function completeSave(timestamp) {
    return {
        type: STATUS_SAVE_COMPLETE,
        payload: timestamp
    };
}

export function changeKeyboardTarget(target, callback, value) {
    return {
        type: STATUS_KEYBOARD_TARGET_CHANGE,
        payload: {
            target,
            callback,
            value
        }
    };
}
