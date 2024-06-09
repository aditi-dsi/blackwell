import React, { useContext } from "react"
import BWContext from "../../context/BWContext"

const Account : React.FC = () => {
  // Fetch current address from context
  const {selectedAccount} = useContext(BWContext);
  if(selectedAccount){
    return(
      <p className="text-pink-500">{`${selectedAccount.slice(0,5)}............${selectedAccount.slice(-5,selectedAccount.length)}`}</p>
    )
  }else{
    // Indicator for when no accounts connected
    return(
      <p className="text-white">No Account Connected</p>
    )

  }
}

export default Account