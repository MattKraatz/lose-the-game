import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import web3 from 'web3';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import TheGameArtifact from '../ux/src/contract-artifacts/contracts/TheGame.sol/TheGame.json';
import { TheGame } from '../typechain-types';

describe('TheGame', function () {
  let theGame: TheGame;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    theGame = (await waffle.deployContract(owner, TheGameArtifact)) as TheGame;

    // test initial deployment state
  });

  it('should record a loss', async function () {
    expect(await theGame.connect(alice).lostGame())
      .to.emit(theGame, 'GameLost')
      .withArgs(alice.address);
  });
});
