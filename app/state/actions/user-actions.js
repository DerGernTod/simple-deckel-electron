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
    return (dispatch) => {
        dispatch({ type: STATUS_LOADING });
        const newUser = {
            name,
            password,
            createdBy,
            timestamp: Date.now()
        };
        DataBase.table('users').add(newUser)
        .then(id => dispatch({
            type: USER_ADD,
            payload: { 
                id,
                ...newUser
            }
        }))
        .finally(() => {
            dispatch({ type: STATUS_SAVE_COMPLETE });
        });
    };
}

export function deleteUser(id) {
    return (dispatch) => {
        dispatch({ type: STATUS_LOADING });
        DataBase.table('users').delete(id)
            .then(() => dispatch({
                type: USER_DELETE,
                payload: { id }
            }))
            .finally(() => {
                dispatch({ type: STATUS_SAVE_COMPLETE });
            });
    };
}

export function updateUser(id, name, password, editedBy) {
    return (dispatch) => {
        dispatch({ type: STATUS_LOADING });
        const updatedUser = {
            id,
            name,
            password,
            createdBy: editedBy,
            timestamp: Date.now()
        };
        DataBase.table('users').update(id, updatedUser)
            .then(() => {
                dispatch({
                    type: USER_UPDATE,
                    payload: updatedUser
                });
            })
            .finally(() => {
                dispatch({ type: STATUS_SAVE_COMPLETE });
            });
    };
}
