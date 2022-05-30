import { useState } from 'react';
import { ethers } from 'ethers';

function useProvider() {
  const [provider] = useState(() => new ethers.providers.JsonRpcProvider());

  return { provider };
}

export default useProvider;
