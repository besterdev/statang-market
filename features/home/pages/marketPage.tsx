import React from "react";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

import { CardPrice } from "../components/cardPrice";
import { ButtonCoin } from "../components/buttonCoin";

import { getTicker } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers/index";

const coins = [
  {
    pair: "BTC/THB",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    route: "BTC_THB",
  },
  {
    pair: "BUSD/THB",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
    route: "BUSD_THB",
  },
  {
    pair: "USDT/THB",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    route: "USDT_THB",
  },
];

export const MarketPage = () => {
  //---------------------
  // ROUTER
  //---------------------
  const router = useRouter();
  const { pair } = router.query;

  //---------------------
  // DISPATCH
  //---------------------
  const dispatch = useDispatch();

  //---------------------
  // VARIABLE
  //---------------------
  const ticker = useSelector((state: RootState) => state.ticker.ticker);
  const loading = useSelector((state: RootState) => state.ticker.loading);
  const error: any = useSelector((state: RootState) => state.ticker.error);

  useWebSocket("wss://ws.satangcorp.com/ws/!miniTicker@arr", {
    onOpen: () => console.log("WebSocket connection opened."),
    onMessage: (event: WebSocketEventMap["message"]) => processMessages(event),
  });

  //---------------------
  // HANDLER
  //---------------------
  const processMessages = async (event: { data: string }) => {
    const response = JSON.parse(event.data);
    const data = await _.filter(response, (item) => {
      return _.includes(["btc_thb", "busd_thb", "usdt_thb"], item.s);
    });
    const ticker = await _.map(data, (item) => ({
      lastPrice: item.c,
      symbol: item.s,
      volume: item.q,
    }));
    await dispatch(getTicker(ticker, pair as string));
  };

  //---------------------
  // RENDER
  //---------------------
  return (
    <div className=" dark:bg-slate-900 bg-slate-100">
      <Head>
        <title>Satang pro test</title>
        <meta name="front end test" />
        <link
          rel="icon"
          href="https://storage.googleapis.com/satang-pro/public/assets/icons/coins/xfr.png"
        />
      </Head>
      <main className="container flex flex-col-reverse items-center justify-center h-screen py-4 mx-auto space-y-12 space-y-reverse sm:px-10 sm:flex-row sm:space-y-0 sm:space-x-32">
        <div className="flex flex-col space-y-4">
          {_.map(coins, (coin) => (
            <ButtonCoin
              logo={coin.logo}
              pair={coin.pair}
              handlerRoute={() => router.push(`/market/${coin.route}`)}
              key={coin.pair}
              active={pair === coin.route}
            />
          ))}
        </div>
        <CardPrice
          loading={loading}
          image={ticker?.image}
          pair={ticker?.symbol}
          volume={ticker?.volume}
          price={ticker?.lastPrice}
        />
      </main>
    </div>
  );
};
