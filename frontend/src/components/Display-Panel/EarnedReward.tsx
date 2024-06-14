import { useContext, useEffect, useState } from "react";
import BWContext from "../../context/BWContext";
import { ethers } from "ethers";

const EarnedReward: React.FC = () => {
  const { stakerContract, selectedAccount } = useContext(BWContext);
  const [earnedReward, setEarnedReward] = useState<string>('-');

  useEffect(() => {
    // Function: Call rewards() to fetch earned rewards from staker contract
    const fetchEarnedReward = async () => {
      try {
        const earnedRewardWei: number = await stakerContract.rewards(selectedAccount);
        const earnedRewardEth:string = ethers.formatUnits(earnedRewardWei, 18).toString();
        const roundedReward:string = parseFloat(earnedRewardEth).toFixed(2);
        setEarnedReward(roundedReward);
      } catch (error: any) {
        console.error(`Error in fetching earned rewards - ${error.message}`);
      }
    };

    stakerContract && fetchEarnedReward() ;

    // Set interval to fetch rewards every half a minute
    const interval = setInterval(fetchEarnedReward, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);

  }, [stakerContract, selectedAccount]);

  return (
    <div>Total Rewards: {earnedReward} bUSD</div>
  );
};

export default EarnedReward;
