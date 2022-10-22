import { ActionTypes } from "../contants/actionType";
export const userReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_USER:
            return { ...state, ...payload };
        case ActionTypes.ADD_USER_FOLLOWER:
            //add follower Id into user's follower array
            return { ...state, ...state.following.push(payload) }
        case ActionTypes.REMOVE_USER_FOLLOWER:
            //get rid of follower by user id
            const filteredFollowers = state.following.filter(follower => follower !== payload);
            return { ...state, following: filteredFollowers }
        case ActionTypes.INCREMENT_USER_FEED_COUNT:
            //add feedId into user's feeds array
            return { ...state, ...state.feeds.push(payload) }
        case ActionTypes.DECREMENT_USER_FEED_COUNT:
            //remove feedId from user's feeds array
            const filteredFeeds = state.feeds.filter(feed => feed !== payload);
            return { ...state, feeds: filteredFeeds }
        default:
            return state;
    }
}