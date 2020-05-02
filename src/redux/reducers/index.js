import { combineReducers } from "redux";
import { isMobileReducer } from "./isMobileReducer";
import { pointReducer } from "./pointReducer";

export default combineReducers({
  isMobile: isMobileReducer,
  totalPoints: pointReducer,
});
