 // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// using openzeppelin for the erc721 smart contract (nft0)
contract NamETH is ERC721{  //Inheritance

address public owner;

// state variable to call the contract
constructor( string memory _name, string memory _symbol) ERC721(_name,_symbol) // ERC 721 constructor
{
owner = msg.sender;

}

}
