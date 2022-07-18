import { combineReducers } from "redux";
import tickerReducer from "./ticker";

const reducers = combineReducers({
  ticker: tickerReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
