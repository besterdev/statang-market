import _ from "lodash";
import { put } from "redux-saga/effects";
import { Ticker } from "../../type/ticker";

interface PairType {
  type: "GET_TICKER_REQUESTED";
  pair: string;
  tickerList: Ticker[];
}

export function* handlerGetTicker({ tickerList, pair }: PairType) {
  try {
    yield put({
      type: "GET_TICKER_SUCCESS",
      ticker: tickerList,
      pair: pair,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: "GET_USERS_FAILED", message: "unable to retrieve data" });
  }
}
