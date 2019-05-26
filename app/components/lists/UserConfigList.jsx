import React from "react";
import PropTypes from "prop-types";
import { User } from "../User"; 
export const UserConfigList = ({ users, onAdd }) => 
    <ul>
        {
            users.map(user => 
                <User
                    key = {user.id}
                    name = {user.name}
                    onDelete = {() => void 0}
                    onUpdate = {() => void 0} />)
        }
    </ul>;

UserConfigList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    })).isRequired,
    onAdd: PropTypes.func.isRequired
};