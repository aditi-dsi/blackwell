import React, { useContext, useRef } from "react";
import { ethers } from "ethers";
import BWContext from "../context/BWContext";
import Button from "./Miscelleneous/Button";
import StakerContext from "../context/StakerContext";
import { toast } from "react-toastify";

const Withdraw: React.FC = () => {
  // Function: to handle the event when user want to withdraw staked tokens, taken as input

  const { stakerContract } = useContext(BWContext);
  const { isReload, setIsReload } = useContext(StakerContext);
  const withdrawAmountRef = useRef<HTMLInputElement>(null);

  const withdrawToken = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const amount = withdrawAmountRef.current?.value.trim();
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid positive number.")
      return;
    }
    const amountToWithdraw = ethers.parseUnits(String(amount), 18).toString();
    try {
      const transaction = await stakerContract.withdraw(amountToWithdraw);
      setIsReload(isReload);

      // Wait for transcation..
      toast.warn("Transaction is pending...");
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful!");
        if (withdrawAmountRef.current) {
          withdrawAmountRef.current.value = "";
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
      <form onSubmit={withdrawToken} className="max-w-md mx-auto">
        <div className="mb-3">
          <label
            htmlFor="approval-amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
          >
            Withdraw Token :
          </label>
          <input
            type="text"
            ref={withdrawAmountRef}
            id="approval-amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write number of tokens here..."
            required
          />
        </div>
        <Button onClick={withdrawToken} type="submit" label="Withdraw" />
      </form>
    </>
  );
};

export default Withdraw;
