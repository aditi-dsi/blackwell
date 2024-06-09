import { toast } from "react-toastify";

// Function: to handle chain changes

export const chainHandler = async(setState):Promise<void> => {
    let chainIdHex: string = await window.ethereum.request({
        method: 'eth_chainId',
    });
    const chainId = parseInt(chainIdHex, 16);
    toast.warn("You network has changed", {
        toastId: '009'
      });
    setState(prevState=> ({...prevState, chainId}));

}
