import Image from "next/image";

type CardPriceProps = {
  pair: string;
  price: string;
  volume: string;
  image: string;
  loading: boolean;
};

const mockLoading = {
  pair: "BUSD/THB",
  price: "801,681.01",
  volume: "33.45",
  image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
};

export const CardPrice = ({
  pair,
  price,
  volume,
  image,
  loading,
}: CardPriceProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <div
      className={`flex items-center p-6 space-x-10 min-w-[330px] bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
        loading && "blur-[2px] animate-pulse"
      }`}
    >
      <div className="w-20 h-20 overflow-hidden border-none rounded-full">
        {loading ? (
          <div className="w-full h-full bg-slate-500" />
        ) : (
          <Image
            alt="logo"
            src={image ? image : mockLoading.image}
            width="100%"
            height="100%"
          />
        )}
      </div>
      <div className="flex h-[100px] flex-col space-y-2">
        {loading ? (
          <div className="w-[158px] h-6 bg-slate-500 rounded-md" />
        ) : (
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pair && pair?.toLocaleUpperCase().replace("_", "/")}
          </h5>
        )}
        {loading ? (
          <div className="w-[158px] h-8 bg-slate-500 rounded-md" />
        ) : (
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {Number(price)?.toLocaleString()}
          </h3>
        )}
        {loading ? (
          <div className="w-[158px] h-4 bg-slate-500 rounded-md" />
        ) : (
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Volume{" "}
            {loading ? mockLoading.volume : Number(volume)?.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};
