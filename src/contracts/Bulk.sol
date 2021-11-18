// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bulk is ERC721 {
    using Strings for uint256;

    // Token data
    uint256 public immutable maxTokens;
    uint256 public immutable mintFee;
    string private baseURI;
    uint256 private tokenId;

    constructor(string memory name_, string memory symbol_, uint256 maxTokens_, uint256 mintFee_, string memory baseURI_) ERC721(name_, symbol_) {
        // Initialize the token data
        maxTokens = maxTokens_;
        mintFee = mintFee_;
        baseURI = baseURI_;
    }

    // Base URI for the metadata
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // Get the URI for the token
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(_baseURI(), tokenId.toString(), ".json"));
    }

    // Verify that a token may be minted
    modifier mintable {
        require(tokenId + 1 < maxTokens, "Bulk: Max number of tokens has already been reached");
        require(msg.value >= mintFee, "Bulk: Not enough funds to mint token");
        _;
    }

    // Mint a new token
    function mint() external payable mintable {
        _mint(_msgSender(), tokenId++);
    }
}