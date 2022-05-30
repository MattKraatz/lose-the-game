import React from 'react';
import useWallet from '../../hooks/useWallet';

function Wallet() {
  const { currentAccount, tryConnect } = useWallet();

  return (
    <div>
      {currentAccount ? (
        <button
          className={
            'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white ' +
            'hover:border-transparent hover:text-teal-500 hover:bg-white ' +
            'mt-4 lg:mt-0'
          }
        >
          {currentAccount}
        </button>
      ) : (
        <button
          onClick={() => tryConnect()}
          className={
            'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white ' +
            'hover:border-transparent hover:text-teal-500 hover:bg-white ' +
            'mt-4 lg:mt-0'
          }
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default Wallet;
