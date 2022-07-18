import { AxiosResponse } from "axios";
import _ from "lodash";
import { put, call } from "redux-saga/effects";
import { getTicket } from "../../service/getTicker";

interface PairType {
  type: "GET_TICKER_REQUESTED";
  pair: string;
}

export function* handlerGetTicker({ pair }: PairType) {
  try {
    const response: AxiosResponse = yield call(getTicket.get, "/ticker/24hr");
    const ticker = response.data;
    yield put({
      type: "GET_TICKER_SUCCESS",
      ticker: ticker,
      pair: pair,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: "GET_USERS_FAILED", message: "unable to retrieve data" });
  }
}
