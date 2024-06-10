import { Contract, ethers } from "ethers";
import { createContext } from "react";
import stakerAbi from "./ABI/stakerAbi.json";
import stakeTokenAbi from "./ABI/stakeTokenAbi.json";


// Define interface for variables circulated as context
interface BWContextType {
    stakerContract: Contract | null; 
    stakeTokenContract: Contract | null;
    selectedAccount: string;
    chainId: number;
    provider:ethers.BrowserProvider | null;
  }

// Define default values of cotnext variables
const BWContextDefault:BWContextType = {
    stakerContract: null , 
    stakeTokenContract: null ,
    selectedAccount: "",
    chainId: 0,
    provider:null
}

// Create context
const BWContext = createContext(BWContextDefault);

export default BWContext;
