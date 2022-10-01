import { ActionTypes } from "../contants/actionType"

export const updateUser = (userObj) => {
    return {
        type: ActionTypes.UPDATE_USER,
        payload: userObj
    }
};

export const addFollower = (followerObj) => {
    return {
        type: ActionTypes.ADD_USER_FOLLOWER,
        payload: followerObj
    }
};

export const removeFollower = (followerObj) => {
    return {
        type: ActionTypes.REMOVE_USER_FOLLOWER,
        payload: followerObj
    }
};