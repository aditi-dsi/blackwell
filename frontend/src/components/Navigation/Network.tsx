import React, { useContext } from "react"
import BWContext from "../../context/BWContext"

const Network : React.FC = () => {
    // Detect chain id from context
    const {chainId} = useContext(BWContext);
    if(chainId === 43113){
        return (
          <p className="text-blue-500">Avalanche Fuji Testnet</p>
        )
        
    }else{
        // Indicate error warning for unsupported network (i.e. any other chain than AVALANCHE FUJI TESTNET)
        return (
            <p className="text-red-600">Unsupported Network</p>
        )
    }
}

export default Network