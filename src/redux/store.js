import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { pointReducer } from "./reducers/pointReducer";
export const store = createStore(pointReducer, composeWithDevTools());
