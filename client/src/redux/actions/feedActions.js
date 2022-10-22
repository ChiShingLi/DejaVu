import { API_getAllFeeds, API_deleteFeed } from "../../apis/FeedRequest"
import { ActionTypes } from "../contants/actionType"
import { incrementFeedCount, decrementFeedCount } from "./userActions"

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

export const handlePostFeed = (feedObj, feedId) => {
    return async (dispatch) => {
        dispatch(postFeed(feedObj));
        dispatch(incrementFeedCount(feedId));
    }
}

export const likeUnLikeFeed = (feedObj) => {
    return {
        type: ActionTypes.LIKE_UNLIKE_FEED,
        payload: feedObj
    }
}

export const deleteFeedConfirm = (feedId) => {
    return {
        type: ActionTypes.DELETE_FEED,
        payload: feedId
    }
}

export const deleteFeed = (feedId) => {
    return async (dispatch) => {
        //call delete feed API
        const response = await API_deleteFeed(feedId);
        if (response.status) {
            //update feed and decrement user's feed count if successful
            dispatch(decrementFeedCount(feedId));
            dispatch(deleteFeedConfirm(feedId));
        }
    }
}

export const editFeed = (feedObj) => {
    return {
        type: ActionTypes.EDIT_FEED,
        payload: feedObj
    }
}