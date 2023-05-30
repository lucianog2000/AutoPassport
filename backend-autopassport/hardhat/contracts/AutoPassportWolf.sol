// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * Autopassport car tokenizer 
 */
contract AutoPassport is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    event Creation(
        address indexed from,
        uint256 indexed tokenId,
        string vin
    );

    event ColorUpdate(
        address indexed owner,
        uint256 indexed tokenId,
        string newColor
    );

    struct Car {
        string vin;
        uint kilometers;
        string color;
    }

    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => Car) private _cars;
    mapping (string => uint256) private _vinToTokenId;

    constructor() ERC721("Autopassport", "Pass") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmZqVGagDyCDR8JkoHNbkZas7PoW6JGYrEhyKuu5wweR24?_gl=1*86iwxl*rs_ga*OTVlZGJkZmEtZGRlYS00NTE3LWI3NmQtMmM1OGI2OTYzYmNm*rs_ga_5RMPXG14TE*MTY4MzQwOTQ3MS4yMC4xLjE2ODM0MTAwNzkuNjAuMC4w";
    }

    /**
     * Creates a track record of a new car. 
     * Transaction will fail (and burn gas!) if the car already exists.
     */
   function createCar(string memory vin, string memory color) public onlyOwner {
        require(_vinToTokenId[vin] == 0, "Car with this VIN already exists");
        uint256 tokenId = _tokenIdCounter.current();
        _cars[tokenId] = Car(vin, 0, color);
        _vinToTokenId[vin] = tokenId;
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        emit Creation(msg.sender, tokenId, vin);
    }
    /**
    * Updates the current kilometers of the car. Transactions fails and burns gas if 
    * the new kilometer value is lower than the old one.
    */
   function updateKilometers(string memory vin, uint kilometers) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        Car storage carObject = _cars[tokenId];
        require(carObject.kilometers < kilometers, "New kilometers value must be greater than the current value");
        carObject.kilometers = kilometers;
    }
    /**
    * Updates the color of the car. Transactions fails and burns gas if 
    * the car is not owned by the caller.
    */
    function updateColor(string memory vin, string memory newColor) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        Car storage carObject = _cars[tokenId];
        carObject.color = newColor;
        emit ColorUpdate(msg.sender, tokenId, newColor);
    }
     function getCarByTokenId(uint256 tokenId) public view returns(string memory vin, uint kilometers, string memory color) {
        Car storage carObject = _cars[tokenId];
        vin = carObject.vin;
        kilometers = carObject.kilometers;
        color = carObject.color;
    }

    function getCarByVIN(string memory vin) public view returns(uint256 tokenId, uint kilometers, string memory color) {
        tokenId = _vinToTokenId[vin];
        Car storage carObject = _cars[tokenId];
        kilometers = carObject.kilometers;
        color = carObject.color;
    }
}