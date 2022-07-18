import _ from "lodash";
import { Ticker } from "../../type/ticker";

interface Action {
  type: "GET_TICKER_REQUESTED" | "GET_TICKER_SUCCESS" | "GET_TICKER_FAILED";
  ticker: any;
  pair: string;
  message: string;
}

interface TickerInit {
  ticker: Ticker;
  loading: boolean;
  error: string | null;
}

const initialState: TickerInit = {
  ticker: {
    lastPrice: "0",
    symbol: "",
    volume: "0",
    image: "",
  },
  loading: true,
  error: null,
};

const getLogoCoin = (symbol: string) => {
  const logoCoin: any = {
    btc_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    busd_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
    usdt_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
  };
  return logoCoin[symbol];
};

const tickerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_TICKER_REQUESTED":
      return {
        ...state,
        loading: true,
      };
    case "GET_TICKER_SUCCESS":
      const ticker = _.find(action.ticker, (item) => {
        return item.symbol === action.pair;
      });
      if (ticker) {
        ticker.image = getLogoCoin(ticker?.symbol);
      }
      return { ...state, loading: false, ticker: ticker };
    case "GET_TICKER_FAILED":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};

export default tickerReducer;
