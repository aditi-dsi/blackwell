import React from "react";
import CreditScoreLogic from "../CreditScoreLogic";
import Wallet from "../Wallet";
import Navbar from "../Navigation/Navbar";
import { toast } from "react-toastify";
import EarnedReward from "../Display-Panel/EarnedReward";

// Blackwell - Navigation = '/credit-score', Credit Score

const CreditScore: React.FC = () => {
  const handleTipClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    
    // Function: To display an optional tip to help user improve credit score (specifically on BW)
    e.preventDefault();
    toast.info(
      "Tip: BlackWell Credit analysis uses Etherscan API for some of the score factors, hence, try connecting the address with transactions on any of the following testnets to increase score accuracy - Kovan, Rinkeby, Ropsten, Sepolia and Goerli",
      {
        position: 'top-right',
        autoClose: false,
      }
    );
  };
  return (
    <div className="container flex flex-row md:flex-row justify-start border-8 border-solid border-white border-opacity-10 rounded-3xl bg-black bg-opacity-80 w-full md:w-10/12 lg:w-10/12 mx-auto py-4 px-2">
      <Wallet>
        <Navbar />
        {/* Credit score box heading */}
        <h1 className="mt-0 text-center text-pink-500 text-md md:text-xl lg:text-xl">
          Connect wallet and get score
        </h1>

        {/* Display current earning of user & minimum rewards needed for each run */}
        <div className="flex flex-row justify-center mb-3 md:mb-0 lg:mb-0 space-x-1">
          <EarnedReward />
          <p>( 1 run - 10 bUSD )</p>
        </div>

        {/* Indicator bars for score range */}
        <div className="container flex flex-row h-0">
          <div className="container flex flex-col ms-5 h-0 space-y-2 md:space-y-4">
            <div className="container w-full flex flex-row space-x-6 md:space-x-9 lg:space-x-9 items-center">
              <p className="text-sm md:text-lg lg:text-lg">Good</p>
              <div className="h-3 w-1/3 md:w-1/6 bg-green-600 rounded-lg"></div>
            </div>
            <div className="container w-full flex flex-row space-x-1 md:space-x-3 lg:space-x-3 items-center ">
              <p className="text-sm md:text-lg lg:text-lg">Average</p>
              <div className="h-3 w-1/3 md:w-1/6 bg-orange-300 rounded-lg"></div>
            </div>
            <div className="container w-full flex flex-row space-x-8 md:space-x-12 lg:space-x-12 items-center">
              <p className="text-sm md:text-lg lg:text-lg">Low</p>
              <div className="h-3 w-1/3 md:w-1/6 bg-red-600 rounded-lg"></div>
            </div>
          </div>

          {/* Button to trigger handleTipClick() */}
          <button
            onClick={handleTipClick}
            type="button"
            className="text-white hover:text-pink-100 font-medium text-sm text-center w-1/3 md:w-1/12 lg:w-1/12"
          >
            See Tip ?
          </button>
        </div>

        {/* Credit score radial progress bar component with logic */}
        <CreditScoreLogic />
      </Wallet>
    </div>
  );
};

export default CreditScore;
