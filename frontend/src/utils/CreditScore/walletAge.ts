
// WALLET AGE WEIGHTAGE - 20%

interface Transaction {
  timeStamp: string;
}

// Fetch the first transaction timestamp for a given address using Etherscan API
async function fetchFirstTransactionTimestamp(address: string): Promise<number> {
  const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.status !== '1' || data.result.length === 0) {
    throw new Error('Failed to fetch transaction history or no transactions found');
  }

  // Get the timestamp of the first transaction
  const firstTransaction: Transaction = data.result[0];
  return parseInt(firstTransaction.timeStamp, 10);
}

// Calculate the wallet age score
async function getWalletAgeScore(address:string): Promise<number> {
  try {
    const firstTransactionTimestamp = await fetchFirstTransactionTimestamp(address);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const ageInSeconds = currentTimestamp - firstTransactionTimestamp;
    const ageInYears = ageInSeconds / (365 * 24 * 60 * 60); // Convert seconds to years

    let walletAgeScore_: number = 0;

    if (ageInYears > 2) {
      walletAgeScore_ = 180;
    } else if (ageInYears >= 1) {
      walletAgeScore_ = 130;
    } else if (ageInYears >= 0.5){
      walletAgeScore_ = 80;
    }else if(ageInYears > 0){
        walletAgeScore_ = 30;
    }else{
        walletAgeScore_ = 0;
    }
    return walletAgeScore_;
  } catch (error:any) {
    console.error(`Error calculating wallet age score - ${error.message}`);
    return 0; 
  }
}

export default getWalletAgeScore;