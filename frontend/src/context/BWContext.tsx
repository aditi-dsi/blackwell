// import { Contract, ethers } from "ethers";
import { createContext } from "react";


// // Define interface for variables circulated as context
// interface BWContextType {
//     stakerContract: Contract; 
//     stakeTokenContract: Contract;
//     selectedAccount: string;
//     chainId: number;
//     provider:ethers.BrowserProvider;
//   }

// // Define default values of cotnext variables
// const BWContextDefault:BWContextType = {
//     stakerContract: {} , 
//     stakeTokenContract: {},
//     selectedAccount: "",
//     chainId: 0,
//     provider:{}
// }

// Create context
const BWContext = createContext({});

export default BWContext;
