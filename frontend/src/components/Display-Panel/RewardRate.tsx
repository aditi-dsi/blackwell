import React, { useContext, useEffect, useState } from "react";
import BWContext from "../../context/BWContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const RewardRate: React.FC = () => {
  const { stakerContract, selectedAccount } = useContext(BWContext);
  const [rewardRate, setRewardRate] = useState<number>(0);

  useEffect(() => {
    // Function: Call REWARD_RATE variable of staker contract
    const fetchRewardRate = async () => {
      try {
        const rewardRateWei: number = await stakerContract.REWARD_RATE();
        const rewardRateEth: string = ethers.formatUnits(
          rewardRateWei.toString(),
          18
        );
        setRewardRate(Number(rewardRateEth));
      } catch (error: any) {
        toast.error(`Error fetching reward rate - ${error.message}`);
      }
    };
    stakerContract && fetchRewardRate();
  }, [stakerContract, selectedAccount]);
  return <div>Reward Rate: {rewardRate === 0? `- / sec` : `${rewardRate*100}% / sec` }</div>;
};

export default RewardRate;
