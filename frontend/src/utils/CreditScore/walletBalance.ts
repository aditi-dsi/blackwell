import { ethers } from "ethers";

// WALLET BALANCE WEIGHTAGE - 30%


const getWalletBalanceScore = async (address:string, provider:ethers.BrowserProvider): Promise<number> => {
  try {
    // Fetch user's wallet balance
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatUnits(balance.toString(), 18);

    // Calculate wallet balance score
    let balanceScore: number;
    if (Number(balanceInEth) >= 500) {
      balanceScore = 270;
    } else if (Number(balanceInEth) >= 100) {
      balanceScore = 220;
    } else if(Number(balanceInEth) >= 50){
      balanceScore = 170;
    }else if(Number(balanceInEth) >=20){
      balanceScore = 120
    }else if(Number(balanceInEth) > 0){
      balanceScore = 70
    }else{
      balanceScore = 0;
    }
    

    return balanceScore;
  } catch (error:any) {
    console.error(`Error in fetching wallet balance - ${error.message}`);
    return 0
  }
};

export default getWalletBalanceScore;
