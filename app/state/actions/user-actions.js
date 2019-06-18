import { USER_ADD, USER_DELETE, USER_UPDATE, USER_LOGIN, USER_LOGOUT } from "../actions";

export function addUser(name, password, createdBy) {
    return {
        type: USER_ADD,
        payload: {
            name, 
            password,
            createdBy
        }
    };
}

export function deleteUser(id) {
    return {
        type: USER_DELETE,
        payload: {
            id
        }
    };
}

export function updateUser(id, name, password) {
    return {
        type: USER_UPDATE,
        payload: {
            id, 
            name, 
            password
        }
    };
}

export function loginUser(id) {
    return {
        type: USER_LOGIN,
        payload: {
            id
        }
    };
}

export function logoutUser(id) {
    return {
        type: USER_LOGOUT,
        payload: {
            id
        }
    };
}