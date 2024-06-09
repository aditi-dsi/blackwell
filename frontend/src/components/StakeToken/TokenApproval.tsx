import React, { useContext, useRef } from "react";
import Button from "../Miscelleneous/Button";
import { ethers } from "ethers";
import BWContext from "../../context/BWContext";
import { toast } from "react-toastify";

const TokenApproval: React.FC = () => {
  // Function: to detect and handle amount a user want to approve before staking, taken as an input
  const { stakerContract, stakeTokenContract } = useContext(BWContext);
  const approvedTokenRef = useRef<HTMLInputElement>(null);
  const approveToken = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const amount = approvedTokenRef.current?.value.trim();
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      console.error("Please enter a valid positive number");
      return;
    }
    const amountToSend = ethers.parseUnits(String(amount), 18).toString();
    try {
      const transaction = await stakeTokenContract.approve(
        stakerContract.target,
        amountToSend
      );

      // Wait for transaction..
      toast.warn("Transaction is pending..")
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful!")

        if (approvedTokenRef.current) {
          approvedTokenRef.current.value = "";
        }
      } else {
        toast.error("Transaction failed!")
      }
    } catch (error: any) {
      toast.error(`Error Occurred`)
    }
  };
  return (
    <>
      <form onSubmit={approveToken} className="max-w-md mx-auto">
        <div className="mb-3">
          <label
            htmlFor="approval-amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
          >
            Approve Token :
          </label>
          <input
            type="text"
            ref={approvedTokenRef}
            id="approval-amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write number of tokens here..."
            required
          />
        </div>
        <Button onClick={approveToken} type="submit" label="Approve" />
      </form>
    </>
  );
};

export default TokenApproval;
