import { ActionTypes } from "../contants/actionType";

const initialState = {
    feeds: []
}

export const feedReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_FEED:
            return { feeds: payload };
        case ActionTypes.POST_FEED:
            return { ...state, feeds: state.feeds.concat(payload) }
        default:
            return state;
    }
}