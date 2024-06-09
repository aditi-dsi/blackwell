import { Contract } from "ethers";

// STAKING ACTIVITY WEIGHTAGE - 20%

const getStakingActivityScore = async (stakerContract:Contract): Promise<number> => {
  try {
    // Fetch duration of stakes
    const stakeTime = await stakerContract.getStakeTime();
    const withdrawTime = await stakerContract.getWithdrawTime();
    let durationOfStakes = withdrawTime - stakeTime;

    //   Calculate staking activity score
    let durationOfStakesScore: number = 0;

    const secondsInOneDay = 24 * 60 * 60;
    const sixDays = 6 * secondsInOneDay;
    const threeDays = 3 * secondsInOneDay;

    if (durationOfStakes >= sixDays) {
      durationOfStakesScore = 180;
    } else if (durationOfStakes >= threeDays) {
      durationOfStakesScore = 150;
    } else if (durationOfStakes >= secondsInOneDay) {
      durationOfStakesScore = 120;
    } else if (durationOfStakes >= secondsInOneDay / 24) {
      durationOfStakesScore = 90;
    } else if (durationOfStakes > 0) {
      durationOfStakesScore = 60;
    } else {
      durationOfStakesScore = 0;
    }

    return durationOfStakesScore
  } catch (error:any) {
    console.error(`Error in calculating staking activity - ${error.message}`);
    return 0;
  }
};

export default getStakingActivityScore;
