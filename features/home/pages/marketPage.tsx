import React, { useEffect, useState } from "react";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getTicker } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers/index";

import { CardPrice } from "../components/cardPrice";
import { ButtonCoin } from "../components/buttonCoin";

import useInterval from "../../../hooks/useInterval";

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
  // STATE
  //---------------------
  const [isPlaying, setPlaying] = useState<boolean>(false);

  //---------------------
  // VARIABLE
  //---------------------
  const ticker = useSelector((state: RootState) => state.ticker.ticker);
  const loading = useSelector((state: RootState) => state.ticker.loading);
  const error: any = useSelector((state: RootState) => state.ticker.error);

  //---------------------
  // EFFECT
  //---------------------
  useEffect(() => {
    setPlaying(false);
    handlerFilter();
  }, [pair]);

  useInterval(
    () => {
      handlerFilter();
    },
    isPlaying ? 5000 : null
  );

  //---------------------
  // HANDLER
  //---------------------
  const handlerFilter = async () => {
    const pairType = (await pair) as string;
    await dispatch(getTicker(pairType?.toLowerCase()));
    setPlaying(true);
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
