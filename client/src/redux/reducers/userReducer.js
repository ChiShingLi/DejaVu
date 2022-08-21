import { ActionTypes } from "../contants/actionType";

export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
}