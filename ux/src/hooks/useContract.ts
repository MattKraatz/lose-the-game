import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import useProvider from './useProvider';
import TheGameArtifact from '../contract-artifacts/contracts/TheGame.sol/TheGame.json';
import { TheGame } from '../../../typechain-types';

function useContract() {
  const { provider } = useProvider();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [theGameContract, setTheGameContract] = useState<TheGame>();

  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner());
    }
  }, [provider]);

  useEffect(() => {
    if (signer) {
      setTheGameContract(
        new ethers.Contract(
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          TheGameArtifact.abi,
          signer
        ) as TheGame
      );
    }
  }, [signer]);

  return { signer, theGameContract };
}

export default useContract;
