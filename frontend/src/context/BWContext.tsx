import { createContext } from "react";


// Define interface for variables circulated as context
interface BWContextType {
    stakerContract: any; 
    stakeTokenContract: any;
    selectedAccount: string;
    chainId: number;
    provider:any;
  }

// Define default values of cotnext variables
const BWContextDefault:BWContextType = {
    stakerContract: {} , 
    stakeTokenContract: {} ,
    selectedAccount: "",
    chainId: 0,
    provider:{}
}

// Create context
const BWContext = createContext(BWContextDefault);

export default BWContext;
