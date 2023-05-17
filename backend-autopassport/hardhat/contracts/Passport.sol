// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Passport is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Passport", "car") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmZqVGagDyCDR8JkoHNbkZas7PoW6JGYrEhyKuu5wweR24?_gl=1*86iwxl*rs_ga*OTVlZGJkZmEtZGRlYS00NTE3LWI3NmQtMmM1OGI2OTYzYmNm*rs_ga_5RMPXG14TE*MTY4MzQwOTQ3MS4yMC4xLjE2ODM0MTAwNzkuNjAuMC4w";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}