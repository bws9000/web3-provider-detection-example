export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (eventName: string, listener: (...args: any[]) => void) => void;
  removeListener?: (
    eventName: string,
    listener: (...args: any[]) => void
  ) => void;
  isMetaMask?: boolean; //optional
  isCoinbaseWallet?: boolean; //optional/in coinbase wallet
  isCoinbase?: boolean; //optional/present in coinbase
  chainId?: string; //EIP-1193 suggests this
  providers?: EthereumProvider[]; //in coinbase or brave wallet
  overrideIsMetaMask: boolean; //in Coinbase
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
