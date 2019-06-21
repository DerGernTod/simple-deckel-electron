import { USER_ADD, USER_DELETE, USER_UPDATE, USER_LOAD, STATUS_SAVE_COMPLETE, STATUS_LOADING } from "../actions";
import { DataBase } from "../db";

export function loadUsers() {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.table('users')
            .toArray()
            .then(users => {
                dispatch({
                    type: USER_LOAD,
                    payload: users
                });
            })
            .finally(() => {
                dispatch({
                    type: STATUS_SAVE_COMPLETE
                });
            });
    };
}

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
