import { Contract, ethers } from "ethers";
import { createContext } from "react";
import stakerAbi from "./ABI/stakerAbi.json";
import stakeTokenAbi from "./ABI/stakeTokenAbi.json";


// Define interface for variables circulated as context
interface BWContextType {
    stakerContract: Contract; 
    stakeTokenContract: Contract;
    selectedAccount: string;
    chainId: number;
    provider:ethers.BrowserProvider;
  }

// Define default values of cotnext variables
const BWContextDefault:BWContextType = {
    stakerContract: abstract class stakerContract {
} , 
    stakeTokenContract: abstract class stakeTokenContract {
} ,
    selectedAccount: "",
    chainId: 0,
    provider: class provider{
        
    }
}

// Create context
const BWContext = createContext(BWContextDefault);

export default BWContext;
