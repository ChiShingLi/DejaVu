import { ActionTypes } from "../contants/actionType"

export const updateUser = (userObj) => {
    return {
        type: ActionTypes.UPDATE_USER,
        payload: userObj
    }
};