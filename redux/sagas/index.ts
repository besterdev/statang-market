import { all, takeEvery } from "redux-saga/effects";
import { handlerGetTicker } from "./getTicker";

function* watcherTickerSaga() {
  yield takeEvery("GET_TICKER_REQUESTED", handlerGetTicker);
}

export default function* rootSaga() {
  yield all([watcherTickerSaga()]);
}
