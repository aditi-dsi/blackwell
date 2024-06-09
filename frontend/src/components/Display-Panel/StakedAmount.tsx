import React, { useContext, useEffect, useState } from "react"
import BWContext from "../../context/BWContext"
import { ethers } from "ethers";
import StakerContext from "../../context/StakerContext";
import { toast } from "react-toastify";

const StakedAmount : React.FC = () => {
  const {stakerContract, selectedAccount} = useContext(BWContext);
  const {isReload} = useContext(StakerContext);
  const [stakedAmount, setStakedAmount] = useState<string>('-');
  
  useEffect(()=>{
    // Function: Call stakedBalance() to fetch staked amount by a user
    const fetchStakedAmount = async() => {
      try {
        const amountStakedWei : number = await stakerContract.stakedBalance(selectedAccount);
        const amountStakedEth :string = ethers.formatUnits(amountStakedWei.toString(), 18)
        setStakedAmount(amountStakedEth);
      } catch (error:any) {
        toast.error(`Error fetching staked balance - ${error.message}`)
      }
    }
    stakerContract && fetchStakedAmount()
  }, [stakerContract, selectedAccount, isReload])

  return(
    <p>Staked Amount: {stakedAmount} BLK</p>
  )
}

export default StakedAmount