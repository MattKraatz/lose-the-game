import React from 'react';

function Wallet() {
  return (
    <div>
      <a
        href='#'
        className={
          'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white ' +
          'hover:border-transparent hover:text-teal-500 hover:bg-white ' +
          'mt-4 lg:mt-0'
        }
      >
        Connect Wallet
      </a>
    </div>
  );
}

export default Wallet;
