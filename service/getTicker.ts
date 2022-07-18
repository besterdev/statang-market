import axios from "axios";
import _ from "lodash";

export const getTicket = axios.create({
  baseURL: `https://satangcorp.com/api/v3`,
});

// const getLogoCoin = (symbol: string) => {
//   const logoCoin: any = {
//     btc_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
//     busd_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png",
//     usdt_thb: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
//   };
//   return logoCoin[symbol];
// };

// export const getTicket = (pair: string) => {
//   const response = axios.get(`https://satangcorp.com/api/v3/ticker/24hr`);
//   const ticker = _.find(response.data, (item) => {
//     return item.symbol === pair;
//   });

//   if (ticker) {
//     ticker.image = getLogoCoin(ticker?.symbol);
//   }
//   return ticker;
// };
