import React, { useContext } from "react";
import BWContext from "../context/BWContext";
import { toast } from "react-toastify";

const ClaimReward: React.FC = () => {
  // Function: to handle the event when user want to claim rewards, invoked with button: 'Claim bUSD'

  const { stakerContract } = useContext(BWContext);

  const claimReward = async () => {
    try {
      const transaction = await stakerContract?.claimReward();

      // Wait for transaction..
      toast.warn("Transaction is pending...")
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successfull!");
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error: any) {
      toast.error(`Error Occurred`);
    }
  };

  return (
    <>
      <button type="button" onClick={claimReward} className="text-pink-500 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Claim bUSD</button>

    </>
  );
};

export default ClaimReward;
