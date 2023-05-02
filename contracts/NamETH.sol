 // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// using openzeppelin for the erc721 smart contract (nft0)
contract NamETH is ERC721{  //Inheritance

uint256 public maxSupply;
// to get the count of domains
address public owner;

//TODO
// 1. list domains
// 2. Buy Domains
// 3. Get Paid


struct Domain { // Domain name DS
    string name;
    uint256 cost;
    bool isOwned;
}

// mapping creates a key-value pair 
mapping(uint256 => Domain) public domains;

//custom modifier
modifier onlyOwner() { 
require(msg.sender == owner);// to check that function can only be used by the smart contract owner
_; // acts as a placeholder for function body
}
// state variable to call the contract
constructor( string memory _name, string memory _symbol) ERC721(_name,_symbol) // ERC 721 constructor
{
owner = msg.sender;

}
//  model a domain -- struct

// list function for domains
function list(string memory _name, uint256 _cost) public onlyOwner {

maxSupply++;
domains[maxSupply] = Domain(_name,_cost,false);
// save the domain
// update total domain count
}
}
