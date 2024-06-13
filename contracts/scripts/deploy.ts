import { ethers } from "hardhat";
import { Signer } from "ethers";

async function deployContracts(): Promise<void> {
  let signer: Signer;
  const [deployer] = await ethers.getSigners();
  signer = deployer;

  // Deploy StakeToken contract
  const stakeTokenFactory = await ethers.getContractFactory("StakeToken", signer);
  const initialSupplyForStake = ethers.utils.parseEther("1000.0")
  const stakeToken = await stakeTokenFactory.deploy(initialSupplyForStake);
  const deployedStakeToken = await stakeToken.deployed();
  console.log("StakeToken deployed at:", deployedStakeToken.address);

  // Deploy RewardToken contract
  const rewardTokenFactory = await ethers.getContractFactory("RewardToken", signer);
  const initialSupplyForReward = ethers.utils.parseEther("1000000.0")
  const rewardToken = await rewardTokenFactory.deploy(initialSupplyForReward);
  const deployedRewardToken =  await rewardToken.deployed();
  console.log("RewardToken deployed at:", deployedRewardToken.address);

  // Deploy Staker contract
  const stakerFactory = await ethers.getContractFactory("Staker", signer);
  const staker = await stakerFactory.deploy(deployedStakeToken.address, deployedRewardToken.address);
  const deployedStaker = await staker.deployed();
  console.log("Staker deployed at:", deployedStaker.address);
}

deployContracts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
