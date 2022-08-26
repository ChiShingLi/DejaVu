import { combineReducers } from "redux";
import { feedReducer } from "./feedReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    user: userReducer,
    feed: feedReducer
});

export default reducers;