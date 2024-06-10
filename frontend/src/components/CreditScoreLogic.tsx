import React, { useContext, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import getTransactionHistoryScore from "../utils/CreditScore/transactionHistory";
import getWalletBalanceScore from "../utils/CreditScore/walletBalance";
import getStakingActivityScore from "../utils/CreditScore/stakingActivity";
import getDAppInteractionScore from "../utils/CreditScore/dappInteraction";
import getWalletAgeScore from "../utils/CreditScore/walletAge";
import BWContext from "../context/BWContext";
import Loader from "./Miscelleneous/Loader";
import { toast } from "react-toastify";
import AICreditReport from "../utils/AICreditReport";

const CreditScoreLogic: React.FC = () => {
  
  // Logic to calculate credit score for a user by considering five factors, invoked with button: 'GET SCORE'
  const { stakerContract, selectedAccount, provider } = useContext(BWContext);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleScoreClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      const transaction = await stakerContract?.useRewards();
      toast.warn("Transaction is pending..");
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful!")
        try {
          setIsLoading(true);

          // Factor - 1
          const txHistoryScore: number = await getTransactionHistoryScore(
            selectedAccount,
            provider
          );

          // Factor - 2
          const walletBalanceScore: number = await getWalletBalanceScore(
            selectedAccount,
            provider
          );

          // Factor - 3
          const stakingActivityScore: number = await getStakingActivityScore(
            stakerContract
          );

          // Factor - 4
          const dappInteractionScore: number = await getDAppInteractionScore(
            selectedAccount
          );

          // Factor - 5
          const walletAgeScore: number = await getWalletAgeScore(
            selectedAccount
          );
          
          // Getting the cumulative score
          const finalCreditScore =
          txHistoryScore +
          walletBalanceScore +
          stakingActivityScore +
          dappInteractionScore +
          walletAgeScore;

          setScore(finalCreditScore);

          // Throw warning when score is too low to be considered in a range
          finalCreditScore < 300
          ? toast.error("Score between 300-900 to get a color")
          : "";

        } catch (error: any) {
          toast.error(`Error Occurred - ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }else{
        toast.error("Transaction failed!")
      }
    } catch (error: any) {
        toast.error(`Error Occurred - ${error.message.slice(21,82)}`)
    }
  };
  const pathColor =
    score >= 300 && score < 500
      ? "#dc2626"
      : score >= 500 && score < 700
      ? "#f6993f"
      : score >= 700 && score < 900
      ? "#16a34a"
      : "";
  const backgroundColor =
    score >= 300 && score < 500
      ? "#dc2626"
      : score >= 500 && score < 700
      ? "#f6993f"
      : score >= 700 && score < 900
      ? "#16a34a"
      : "";
  return (
    <div>

      <div className="flex flex-col justify-center items-center mb-4 mx-auto">

        <div className="w-9/12 md:w-1/4 h-[3vh] md:h-[25vh] lg:h-[25vh] mt-24 md:mt-6 lg:mt-6 mb-3 md:mb-0 lg:mb-0">
          <CircularProgressbar
            strokeWidth={6}
            value={score}
            minValue={300}
            maxValue={900}
            text={
              isLoading
                ? "Calculating.."
                : score > 0
                ? `${score}/900`
                : "No Score"
            }
            styles={buildStyles({
              textSize: "12px",
              pathColor: `${pathColor}`,
              textColor: "#fff",
              trailColor: "#fff",
              backgroundColor: `${backgroundColor}`,
            })}
          />
          {isLoading ? <Loader /> : null}
        </div>
        <div className="flex flex-row justify-center space-x-2">

        <button
          onClick={handleScoreClick}
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:text-pink-100 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-48 text-center w-1/2 md:w-full lg:w-full"
        >
          GET SCORE
        </button>

        {/* AI integration to generate a overall credit report based on the current score */}
        <AICreditReport score={score}/>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreLogic;
