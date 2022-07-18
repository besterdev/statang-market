import { Ticker } from "./../../type/ticker";

export const getTicker = (tickerList: Ticker[], pair: string) => {
  return {
    type: "GET_TICKER_REQUESTED",
    tickerList: tickerList,
    pair: pair?.toLowerCase(),
  };
};
