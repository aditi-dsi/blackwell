import { Contract, ethers } from "ethers";
import { createContext } from "react";

// Define interface for variables circulated as context
interface BWContextType {
    stakerContract: Contract ; 
    stakeTokenContract: Contract;
    selectedAccount: string;
    chainId: number;
    provider:ethers.BrowserProvider;
  }

// Create context
const BWContext = createContext<BWContextType>('');

export default BWContext;
