// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bulk is ERC721 {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}
}