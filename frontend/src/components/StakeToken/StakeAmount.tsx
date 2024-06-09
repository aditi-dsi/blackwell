import React, { useContext, useRef } from "react";
import BWContext from "../../context/BWContext";
import { ethers } from "ethers";
import Button from "../Miscelleneous/Button";
import StakerContext from "../../context/StakerContext";
import { toast } from "react-toastify";

const StakeAmount: React.FC = () => {
  // Function: to detect and handle amount a user want to stake, taken as an input

  const { stakerContract } = useContext(BWContext);
  const { isReload, setIsReload } = useContext(StakerContext);
  const stakeAmountRef = useRef<HTMLInputElement>(null);

  const stakeToken = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const amount = stakeAmountRef.current?.value.trim();
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }
    const amountToStake = ethers.parseUnits(String(amount), 18).toString();
    try {
      const transaction = await stakerContract.stake(amountToStake);
      // Wait for transaction..
      toast.warn("Transaction is pending..");
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful!");
        setIsReload(!isReload);
        if (stakeAmountRef.current) {
          stakeAmountRef.current.value = "";
        }
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error: any) {
      toast.error(`Error Occurred`);
    }
  };

  return (
    <>
      <form onSubmit={stakeToken} className="max-w-md mx-auto clear-both">
        <div className="mb-3">
          <label
            htmlFor="stake-amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
          >
            Stake Token (in BLK) :
          </label>
          <input
            type="text"
            ref={stakeAmountRef}
            id="stake-amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write number of tokens here..."
            required
          />
        </div>
        <Button onClick={stakeToken} type="submit" label="Stake" />
      </form>
    </>
  );
};

export default StakeAmount;
