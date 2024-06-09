import { ethers } from 'ethers';

// TRANSACTION HISTORY WEIGHTAGE - 20%

const getTransactionHistoryScore = async (address:string, provider: ethers.BrowserProvider):Promise<number>=> {
  try {
    // Fetch transaction count
    const transactionCount = await provider.getTransactionCount(address);
    
    // Calculate transaction count score
    let transactionCountScore = 0;
    if (transactionCount >= 100) {
      transactionCountScore = 180;
    } else if (transactionCount >= 50) {
      transactionCountScore = 130;
    } else if(transactionCount > 0){
      transactionCountScore = 80;
    }else{
      transactionCountScore = 0;
    }
    return transactionCountScore
  } catch (error:any) {
    console.error(`Error in calculating transaction history - ${error.message}`);
    return 0;
  }
};

  export default getTransactionHistoryScore;