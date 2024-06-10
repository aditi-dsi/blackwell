import { Contract, ethers } from "ethers";
import { createContext } from "react";


// Define interface for variables circulated as context
interface BWContextType {
    stakerContract: Contract | undefined ; 
    stakeTokenContract: Contract | undefined;
    selectedAccount: string | "";
    chainId: number | 0;
    provider:ethers.BrowserProvider | undefined;
  }

// Define default values of cotnext variables
const BWContextDefault:BWContextType = {
    stakerContract: undefined , 
    stakeTokenContract: undefined,
    selectedAccount: "",
    chainId: 0,
    provider:ethers.BrowserProvider
}

// Create context
const BWContext = createContext<BWContextType>(BWContextDefault);

export default BWContext;
