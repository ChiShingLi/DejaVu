import { ActionTypes } from "../contants/actionType";
export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_USER:
            return { ...state, ...payload };
        case ActionTypes.ADD_USER_FOLLOWER:
            return { ...state, ...state.following.push(payload) }
        case ActionTypes.REMOVE_USER_FOLLOWER:
            //get rid of follower by user id
            const filteredFollowers = state.following.filter(follower => follower !== payload);
            return { ...state, following: filteredFollowers }
        default:
            return state;
    }
}