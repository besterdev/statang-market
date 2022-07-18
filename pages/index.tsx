import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";

import { MarketPage } from "../features/home/pages/marketPage";

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/market/BTC_THB");
  }, []);

  return <MarketPage />;
};

export default Home;
