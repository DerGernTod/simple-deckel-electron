import { USER_ADD, USER_DELETE, USER_UPDATE, USER_LOGIN, USER_LOGOUT } from "../actions";

const initialState = {
    list: [{
        id: 0,
        name: 'hans',
        password: 'wurst',
        createdBy: 0,
        timestamp: 0
    }],
    loggedInUser: -1,
    nextUserId: 1
};

export function users(state = initialState, action) {
    switch (action.type) {
        case USER_ADD:
            return {
                ...state,
                list: state.list.concat([{
                    id: state.nextUserId++,
                    timestamp: Date.now(),
                    ...action.payload
                }])
            };
        case USER_DELETE:
            return {
                ...state,
                list: state.list.filter(elem => elem.id != action.payload.id)
            };
        case USER_UPDATE:
            return {
                ...state,
                list: state.map(elem => elem.id === action.payload.id ? action.payload : elem)
            };
        case USER_LOGIN:
            return {
                ...state,
                loggedInUser: action.payload.id
            };
        case USER_LOGOUT:
            return {
                ...state,
                loggedInUser: -1
            };
    }
    return state;
}

