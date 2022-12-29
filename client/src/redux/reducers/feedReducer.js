import { ActionTypes } from "../contants/actionType";

const initialState = {
    feeds: []
}

export const feedReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_FEED:
            payload.sort((a, b) => {
                const aTime = a.createdAt;
                const bTime = b.createdAt;
                if (aTime < bTime) {
                    return 1;
                }
                if (aTime > bTime) {
                    return -1;
                }
            });
            return { feeds: payload };
        case ActionTypes.POST_FEED:
            //append to the front of the feeds array
            return { ...state, feeds: state.feeds, ...state.feeds.unshift(payload) }
        case ActionTypes.LIKE_UNLIKE_FEED:
            //if current feed is already liked by the user, unlike it
            var foundIndex = state.feeds.findIndex(item => item._id === payload.feedId);
            if (state.feeds[foundIndex].likes.includes(payload.userId)) {
                state.feeds[foundIndex].likes = state.feeds[foundIndex].likes.filter(id => id !== payload.userId);
            } else {
                //else, like the feed
                state.feeds[foundIndex].likes = state.feeds[foundIndex].likes.concat(payload.userId);
            }
            return { ...state, feeds: state.feeds };
        case ActionTypes.DELETE_FEED:
            //delete/filter out feed from feed array
            const filteredFeed = state.feeds.filter(feed => feed._id !== payload);
            return { ...state, feeds: filteredFeed };
        case ActionTypes.EDIT_FEED:
            //edit the feed's content
            return {
                ...state,
                feeds: state.feeds.map(feed => feed._id == payload._id ?
                    //if feedId is found, make changes to its contents
                    { ...feed, desc: payload.desc, photo: payload.photo }
                    :
                    //otherwise, return original feed
                    feed
                )
            }
        default:
            return state;
    }
}