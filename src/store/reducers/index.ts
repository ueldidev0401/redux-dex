import { combineReducers } from "redux";
import walletReducer from "./wallet";
// add here.

export const rootReducer = combineReducers({
  wallet: walletReducer,
  // add here.
});

const reducers = (state, action) => rootReducer(state, action);
export default reducers;
