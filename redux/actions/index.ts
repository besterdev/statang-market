export const getTicker = (pair: string) => {
  return {
    type: "GET_TICKER_REQUESTED",
    pair: pair,
  };
};
