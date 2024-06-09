import React, { useState } from "react";
import Wallet from "../Wallet";
import Navbar from "../Navigation/Navbar";
import { StakerProvider } from "../../context/StakerContext";
import Withdraw from "../Withdraw";
import Panel from "../Display-Panel/Panel";
import TokenApproval from "../StakeToken/TokenApproval";
import StakeAmount from "../StakeToken/StakeAmount";

// Blackwell - Navigation = '/stake', Stake

const Stake: React.FC = () => {
  const [displaySection, setDisplaySection] = useState<String>("stake");

  // Function: to handle Tabbed Navigation of [STAKE,  WITHDRAW]
  const handleButtonClick = (section: string) => {
    setDisplaySection(section);
  };
  return (
    <>
      <h1 className="mb-6 text-xl sm:text-xl md:text-lg text-pink-500 bg-white font-medium text-center">
        Approve your tokens and start staking right away!
      </h1>
      <div className="container mx-auto self-center w-full max-w-2xl p-4 bg-white rounded-xl shadow-lg shadow-gray-400 sm:p-6 md:p-8 dark:bg-[#16181d] dark:border-gray-700">
        <Wallet>
          <Navbar />
          <StakerProvider>
            <div className="container text-center min-h-[425px] transition-all duration-300">
              <Panel />
              <div className="flex flex-col overflow-x-auto whitespace-nowrap">
                <div className="flex-row">
                  <button
                    onClick={() => handleButtonClick("stake")}
                    className={`${
                      displaySection === "stake" ? "activeTab" : ""
                    } w-1/2 inline-flex items-center justify-center h-12 px-2 py-2 text-center sm:px-4 -px-1 focus:outline-none`}
                  >
                    <span className="mx-1 text-sm sm:text-base">STAKE</span>
                  </button>

                  <button
                    onClick={() => handleButtonClick("withdraw")}
                    className={`${
                      displaySection === "withdraw" ? "activeTab" : ""
                    } text-center w-1/2 inline-flex justify-center items-center h-12 px-2 py-2 sm:px-4 -px-1 cursor-base focus:outline-none`}
                  >
                    <span className="mx-1 text-sm sm:text-base">WITHDRAW</span>
                  </button>
                </div>
                <div className="flex-row mt-7 mb-3">
                  {displaySection === "stake" && (
                    <div>
                      <TokenApproval />
                      <StakeAmount />
                    </div>
                  )}
                  {displaySection === "withdraw" && (
                    <div>
                      <Withdraw />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </StakerProvider>
        </Wallet>
      </div>
    </>
  );
};

export default Stake;
