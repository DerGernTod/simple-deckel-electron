import { STATUS_SAVE_COMPLETE, STATUS_KEYBOARD_TARGET_CHANGE, STATUS_LOGIN, STATUS_LOGOUT } from '../actions'

const initialState = {
    loggedInUser: {
        id: -1,
        name: 'Unbekannt'
    },
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
        case STATUS_LOGIN:
            return {
                ...state,
                loggedInUser: action.payload
            };
        case STATUS_LOGOUT:
            return {
                ...state,
                loggedInUser: {
                    id: -1,
                    name: 'Unbekannt'
                }
            };
    }
    return state;
}

