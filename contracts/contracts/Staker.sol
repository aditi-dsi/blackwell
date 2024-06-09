// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Staker is ReentrancyGuard {
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint public constant REWARD_RATE = 1e16;
    uint private totalStakedTokens;
    uint public rewardPerTokenStored;
    uint public lastUpdateTime;
    uint public stakeTimestamp;
    uint public withdrawTimestamp;

    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public rewardsToBeClaimed;
    mapping(address => uint) public userRewardPerTokenPaid;

    event Staked(address indexed user, uint256 indexed amount);
    event Withdrawn(address indexed user, uint256 indexed amount);
    event RewardsClaimed(address indexed user, uint256 indexed amount);

    constructor(address stakingToken, address rewardToken) {
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }

    function rewardPerToken() public view returns (uint) {
        if (totalStakedTokens == 0) {
            return rewardPerTokenStored;
        }
        uint totalTime = block.timestamp - (lastUpdateTime);
        uint totalRewards = REWARD_RATE* totalTime;
        return
            rewardPerTokenStored + (
                totalRewards*(1e18)/(totalStakedTokens)
            );
    }

    function rewards(address account) public view returns (uint) {
        return
            stakedBalance[account]
                * (rewardPerToken() - userRewardPerTokenPaid[account])
                / (1e18)
                + rewardsToBeClaimed[account];
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        rewardsToBeClaimed[account] = rewards(account);
        userRewardPerTokenPaid[account] = rewardPerTokenStored;
        _;
    }

    function stake(uint amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        totalStakedTokens += amount;
        stakedBalance[msg.sender] += amount;
        emit Staked(msg.sender, amount);
        bool success = s_stakingToken.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Transfer Failed");
        stakeTimestamp = block.timestamp;
    }
    function withdraw(
        uint amount
    ) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than zero");
        require(
            stakedBalance[msg.sender] >= amount,
            "Staked amount not enough"
        );
        totalStakedTokens -= amount;
        stakedBalance[msg.sender] -= amount;
        emit Withdrawn(msg.sender, amount);
        (msg.sender, amount);
        bool success = s_stakingToken.transfer(msg.sender, amount);
        require(success, "Transfer Failed");
        withdrawTimestamp = block.timestamp;
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint reward = rewardsToBeClaimed[msg.sender];
        require(reward > 0, "No rewards to claim");
        rewardsToBeClaimed[msg.sender] = 0;
        emit RewardsClaimed(msg.sender, reward);
        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer Failed");
    }

    function getStakeTime() public view returns (uint256) {
        return stakeTimestamp;
    }
    function getWithdrawTime() public view returns (uint256) {
        return withdrawTimestamp;
    }
    function useRewards() external nonReentrant updateReward(msg.sender) {
        require(
            stakeTimestamp < withdrawTimestamp,
            "You must withdraw atleast 1 BLK to unlock this feature!"
        );
        require(
            rewardsToBeClaimed[msg.sender] >= 10000000000000000000,
            "You do not have enough bUSD. Please stake or try again later!"
        );
        rewardsToBeClaimed[msg.sender] -= 10000000000000000000;
    }
}

