import { STATUS_KEYBOARD_TARGET_CHANGE, STATUS_SAVE_COMPLETE, STATUS_LOGIN, STATUS_LOGOUT } from "../actions";

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

export function login(id, name) {
    return {
        type: STATUS_LOGIN,
        payload: {
            id,
            name
        }
    };
}

export function logout() {
    return {
        type: STATUS_LOGOUT
    };
}