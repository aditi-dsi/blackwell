import { ReactNode, useEffect, useState } from "react";
import { connectWallet } from "../utils/connectWallet";
import BWContext from "../context/BWContext";
import { accountHandler } from "../utils/accountHandler";
import { chainHandler } from "../utils/chainHandler";
import { Contract } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interface for state variables of wallet
interface WalletState {
  provider: any | null;
  selectedAccount: string | null;
  stakerContract: Contract | null;
  stakeTokenContract: Contract | null;
  chainId: number | null;
}

// Define interface for wallet props, children: generally any element that would need wallet state variables (via BWContext) to achieve a task
interface WalletProps {
  children: ReactNode;
}

const Wallet: React.FC<WalletProps> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    selectedAccount: null,
    stakerContract: null,
    stakeTokenContract: null,
    chainId: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Handle accounts and chain changes

    window.ethereum.on("accountsChanged", () => accountHandler(setState));
    window.ethereum.on("chainChanged", () => chainHandler(setState));

    return () => {
      window.ethereum.removeListener("accountsChanged", () =>
        accountHandler(setState)
      );
      window.ethereum.removeListener("chainChanged", () =>
        chainHandler(setState)
      );
    };
  });

  const handleWallet = async () => {
    try {
      setIsLoading(true);

      // Desctructure state variables after wallet connection
      const {
        provider,
        selectedAccount,
        stakerContract,
        stakeTokenContract,
        chainId,
      } = await connectWallet();

      setState({
        provider,
        selectedAccount,
        stakerContract,
        stakeTokenContract,
        chainId,
      });
      toast.success("Connection Successfull !")
    } catch (error: any) {
      toast.error(`Error Occurred - ${error.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-0 mx-0 text-center">
      <BWContext.Provider value={state}>{children}</BWContext.Provider>

      {/* Button to invoke wallet connection */}
      <button
        type="button"
        onClick={handleWallet}
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#16181d] rounded-md dark:shadow-pink-800/80">
          {isLoading ? "Loading.." : "Connect Wallet"}
        </span>
      </button>
      
    </div>
  );
};

export default Wallet;
