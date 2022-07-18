import Image from "next/image";

type ButtonCoinProps = {
  logo: string;
  pair: string;
  handlerRoute: Function;
  active: boolean;
};

export const ButtonCoin = ({
  logo,
  pair,
  handlerRoute,
  active,
}: ButtonCoinProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <div
      className={`flex items-center justify-center p-4 space-x-4 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
        active && "bg-gray-100 dark:bg-gray-700"
      }`}
      onClick={() => handlerRoute()}
    >
      <div className="w-6 h-6">
        <Image alt="logo" src={logo} width="100%" height="100%" />
      </div>
      <p className="mb-0 text-lg font-medium text-gray-900 dark:text-white ">
        {pair}
      </p>
    </div>
  );
};
