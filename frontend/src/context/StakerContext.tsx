import React, { ReactNode, createContext, useState } from 'react'

// Define interface for Reload, circulated as context
interface StakerContextType {
  isReload: boolean;
  setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define interface for stake provider props, children: generally any element that would need staker context variables (via StakerContext) to achieve a task
interface StakerProviderProps {
  children: ReactNode;
}

const StakerContext = createContext<StakerContextType>({ isReload: false, setIsReload: () => {} });

export const StakerProvider: React.FC<StakerProviderProps> = ({children}) => {
const [isReload, setIsReload] = useState(false);
  return (
    <StakerContext.Provider value={{isReload, setIsReload}}>
        {children}
    </StakerContext.Provider>
  )
}

export default StakerContext;