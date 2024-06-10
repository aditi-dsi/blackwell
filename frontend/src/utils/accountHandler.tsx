import { toast } from "react-toastify";

// Function: to handle accounts change
export const accountHandler = async(setState:any): Promise<void> => {
  const accounts:string[] =await window.ethereum.request({
    method: 'eth_requestAccounts'
  })
  const selectedAccount = accounts[0];
  toast.warn("You account has changed", {
    toastId: '008'
  });
  setState((prevState:any)=>({...prevState, selectedAccount}))
}


