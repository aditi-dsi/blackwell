import React from 'react';
import StakedAmount from './StakedAmount';
import RewardRate from './RewardRate';
import EarnedReward from './EarnedReward';

const Panel: React.FC = () => {
  // Display Panel: Display user's staking details
  return (
    <div className='container mb-5 flex flex-row justify-between'>
      <RewardRate />
      <StakedAmount />
      <EarnedReward />
    </div>
  );
}

export default Panel;
