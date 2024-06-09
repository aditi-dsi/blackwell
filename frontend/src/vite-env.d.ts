/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ETHERSCAN_API_KEY: string
    readonly VITE_GOOGLE_API_KEY: string
    readonly VITE_STAKETOKEN_CONTRACT_ADDRESS: string
    readonly VITE_STAKER_CONTRACT_ADDRESS: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }