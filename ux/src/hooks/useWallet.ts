import { useState } from 'react';
import { ethers } from 'ethers';

declare let window: any;

function useWallet() {
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();

  const tryConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log('please install MetaMask');
      return;
    }

    const wallet = new ethers.providers.Web3Provider(window.ethereum);

    wallet
      .send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  return { currentAccount, tryConnect };
}

export default useWallet;
