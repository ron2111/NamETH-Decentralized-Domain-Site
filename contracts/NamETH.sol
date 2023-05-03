 // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// using openzeppelin for the erc721 smart contract (nft0)
contract NamETH is ERC721{  //Inheritance

uint256 public maxSupply;
// to get the count of domains/LISTED
uint256 public totalSupply;
// actual number of domains created/MINTED

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
mapping(uint256 => Domain) domains;

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

// to mint the domain names
function mint(uint256 _id) public payable {
    //checks
    require(_id != 0); // it should exist
    require(_id <= maxSupply); // domain if < maxSupply of domains
    require(domains[_id].isOwned==false); // should not be pre-owned
    require(msg.value>=domains[_id].cost); // payment should at least be greater than the cost

totalSupply++;
domains[_id].isOwned = true;

    // function from ERC721 contract
 _safeMint(msg.sender, _id );
}

function getDomain(uint256 _id) public view returns (Domain memory){
    return domains[_id];
}

function getBalance() public view returns (uint256) {
    return address(this).balance;
}
// after minting the buyer's eth stays in the contract, so for that to reach the deployer's account we need to withdraw it from the contract
function withdraw() public onlyOwner {
    //  to transfer ether to the owner with a msg (blank in this case)

    // the generic transfer function gets into some problems
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success);
}
}
