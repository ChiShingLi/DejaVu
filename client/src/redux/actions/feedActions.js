import { API_getAllFeeds } from "../../apis/FeedRequest"
import { ActionTypes } from "../contants/actionType"

export const updateFeed = (post) => {
    return {
        type: ActionTypes.UPDATE_FEED,
        payload: post
    }
}

export const fetchAllFeeds = () => {
    return async (dispatch) => {
        const response = await API_getAllFeeds();
        if (response.status) {
            dispatch(updateFeed(response.feedObj));
        }
    }
}

export const postFeed = (feedObj) => {
    return {
        type: ActionTypes.POST_FEED,
        payload: feedObj
    }
}

export const likeUnLikeFeed = (feedObj) => {
    return {
        type: ActionTypes.LIKE_UNLIKE_FEED,
        payload: feedObj
    }
}