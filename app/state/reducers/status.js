import { STATUS_SAVE_COMPLETE, STATUS_KEYBOARD_TARGET_CHANGE } from '../actions'

const initialState = {
    lastSaved: new Date().toLocaleString('de'),
    vkeyboardCallback: () => void 0,
    vkeyboardTarget: '',
    vkeyboardInitValue: ''
};

export function status(state = initialState, action) {
    switch (action.type) {
        case STATUS_SAVE_COMPLETE:
            return {
                ...state, 
                lastSaved: action.payload
            };
        case STATUS_KEYBOARD_TARGET_CHANGE:
            return {
                ...state,
                vkeyboardTarget: action.payload.target,
                vkeyboardCallback: action.payload.callback,
                vkeyboardInitValue: action.payload.value || ''
            };
    }
    return state;
}

