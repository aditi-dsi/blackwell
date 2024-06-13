import React, { useContext, useState } from "react";
import BWContext from "../../context/BWContext";
import { toast } from "react-toastify";

const TokenRequestHandler: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { stakerContract } = useContext(BWContext);

  const handleRequestTokens = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const transaction = await stakerContract.requestStakeTokens();

      // Wait for transaction..
      toast.warn("Transaction is pending..");
      const receipt = await transaction.wait();
      if (receipt.status === 1) {
        toast.success("Transaction is successful!");
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error: any) {
      toast.error(`Error Occurred - ${error.message.slice(21,70)}..`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button to trigger token request */}
      <button
        type="button"
        onClick={handleRequestTokens}
        className="relative inline-flex items-center justify-center p-0.5 mx-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#16181d] rounded-md dark:shadow-pink-800/80">
          {isLoading ? "Loading.." : "Request 2 BLK"}
        </span>
      </button>
    </>
  );
};

export default TokenRequestHandler;
