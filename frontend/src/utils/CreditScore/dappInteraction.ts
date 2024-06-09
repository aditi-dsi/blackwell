import { ethers } from "ethers";

// INTERACTION WITH DAPPS WEIGHTAGE: 10%

interface Transaction {
  to: string;
  input: string;
}

// Fetch the interaction history for a given address using Etherscan API
async function fetchInteractionHistory(
  address: string
): Promise<Transaction[]> {
  try {
    const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
    console.log(apiKey)
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.result.map((tx: any) => ({
      to: tx.to,
      input: tx.input,
    }));
  } catch (error: any) {
    console.error(`Error in fetching Interaction History - ${error.message}`);
    return [];
  }
}

async function fetchContractABI(contractAddress: string) {
  try {
    const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return JSON.parse(data.result);
  } catch (error: any) {
    console.error(
      `Error in fetching ABI for ${contractAddress} - ${error.message}`
    );
    return null;
  }
}

// Analyze interactions and calculate scores
async function getDAppInteractionScore(address:string): Promise<number> {
  try {
    const transactions = await fetchInteractionHistory(address);
    const uniqueDApps = new Set<string>();
    const activityTypes = new Set<string>();

    for (const tx of transactions) {
      try {
        uniqueDApps.add(tx.to);

        // Decode tx input data
        const abi = await fetchContractABI(tx.to);
        if (abi) {
          const iface = new ethers.Interface(abi);
          const functionFragment = iface.getFunction(tx.input.slice(0, 10));
          if (functionFragment?.name.includes("stake"))
            activityTypes.add("stake");
          else if (functionFragment?.name.includes("swap"))
            activityTypes.add("swap");
          else if (functionFragment?.name.includes("transfer"))
            activityTypes.add("transfer");
          else if (functionFragment?.name.includes("lend"))
            activityTypes.add("lend");
          else if (functionFragment?.name.includes("borrow"))
            activityTypes.add("borrow");
          else activityTypes.add("other");
        }
      } catch (error: any) {
        console.error(
          `Error in the transaction to ${tx.to} - ${error.message}`
        );
        continue;
      }
    }
    const uniqueDAppsCount = uniqueDApps.size;
    const activityVarietyCount = activityTypes.size;

    // Calculate final dAppScore
    const dAppScore =
      (uniqueDAppsCount > 10
        ? 45
        : uniqueDAppsCount >= 5
        ? 30
        : uniqueDAppsCount > 0
        ? 15
        : 0) +
      (activityVarietyCount >= 2 ? 45 : activityVarietyCount > 0 ? 30 : 0);

    return dAppScore;
  } catch (error: any) {
    console.error(`Error in Dapp Interaction score - ${error.message}`);
    return 0;
  }
}

export default getDAppInteractionScore;
