import { ethers, Contract, Signer } from "ethers";
import stakerAbi from "../ABI/stakerAbi.json";
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";
import { toast } from "react-toastify";

// Define interface for connection details
interface ConnectionDetails {
    provider: ethers.BrowserProvider;
    selectedAccount: string;
    stakerContract: Contract;
    stakeTokenContract: Contract;
    chainId: number;
}

// DECLARE ETHEREUM OBJECT
declare global {
    interface Window {
        ethereum?: any;
    }
}

export const connectWallet = async (): Promise<ConnectionDetails> => {
    try {
        let provider: ethers.BrowserProvider | null = null;
        let signer: Signer | null = null;
        let stakerContract: Contract | null = null;
        let stakeTokenContract: Contract | null = null;
        let chainId: number | null = null;

        // Connect wallet (if available), and fetch accounts & current chain
        if (!window.ethereum) {
            toast.error("Wallet is not installed!");
        }

        const accounts: string[] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        const chainIdHex: string = await window.ethereum.request({
            method: 'eth_chainId',
        });

        chainId = parseInt(chainIdHex, 16);

        // Select the first account from accounts as primary
        const selectedAccount = accounts[0];
        if (!selectedAccount) {
            toast.error("No ethereum account available!")
        }

        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        // INSTANTIATE SMART CONTRACT
        const stakerContractAddress = import.meta.env.VITE_STAKER_CONTRACT_ADDRESS;
        const stakeTokenContractAddress = import.meta.env.VITE_STAKETOKEN_CONTRACT_ADDRESS;

        stakerContract = new Contract(stakerContractAddress, stakerAbi, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

        return { provider, selectedAccount, stakerContract, stakeTokenContract, chainId };
        
    } catch (error: any) {
        toast.error(`Error Occurred - ${error.message}`);
        throw error;
    }
}
