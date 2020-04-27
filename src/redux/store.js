import { createStore } from "redux";
import { pointReducer } from "./reducers/pointReducer";
export const store = createStore(pointReducer);
