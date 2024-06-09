import React from "react";
import Wallet from "../Wallet";
import Navbar from "../Navigation/Navbar";
import { StakerProvider } from "../../context/StakerContext";

// Blackwell - Navigation = '/' & '/home', BlackWell, Home

const Home: React.FC = () => {
  return (
    <>
      <div className="container flex flex-col md:flex-row justify-start border-8 border-solid border-white border-opacity-10 rounded-3xl bg-black bg-opacity-80 w-full md:w-10/12 lg:w-10/12 mx-auto p-4 sm:p-6 md:p-8">
        <Wallet>
          <Navbar />
          <StakerProvider>
            <h1 className="text-white text-2xl md:text-6xl lg:text-7xl text-left font-semibold flex-wrap w-full md:w-8/12 my-4 sm:my-5 md:my-10 px-4 sm:px-8 md:px-14">
            Supercharging the reward game with AI
            </h1>

            {/* Features of BW */}
            <ul className="text-left text-sm sm:text-sm mb-6 sm:mb-5 md:mb-6 px-4 sm:px-8 md:px-14 space-y-6">
              <li>&#10003; Stake tokens in BLK, Earn Rewards in bUSD</li>
              <li>&#10003; Withdraw Anytime & claim rewards</li>
              <li>&#10003; Use rewards to unlock exclusive crypto credit score feature</li>
              <li>&#10003; Generate personalized credit report with BlackWell AI</li>
            </ul>
          </StakerProvider>
        </Wallet>
      </div>
    </>
  );
};

export default Home;
