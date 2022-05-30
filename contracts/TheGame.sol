// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

import '@openzeppelin/contracts/access/Ownable.sol';

contract TheGame is Ownable {
    constructor() {}

    // TODO: soul-bound NFTs for participation in The Game
    uint256 entryFee = 0.001 ether;

    function updateEntryFee(uint256 _price) external onlyOwner {
        console.log("Changing mint price from '%s' to '%s'", entryFee, _price);
        entryFee = _price;
    }

    event GameLost(address loser);

    function lostGame() public {
        emit GameLost(msg.sender);
    }
}
