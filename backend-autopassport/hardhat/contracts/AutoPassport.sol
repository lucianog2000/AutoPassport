// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * Autopassport car tokenizer 
 */
contract AutoPassport is ERC721, ERC721Burnable, Ownable, ERC721URIStorage  {
    using Counters for Counters.Counter;

    event Creation(
        address indexed from,
        uint256 indexed tokenId,
        string vin
    );

    struct Car {
        string brand;
        string model;
        string vin;
        string color_code;
        string dateOfManufacture;
        uint mileage;
    }

    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => Car) private _cars;
    mapping (string => uint256) private _vinToTokenId;

    constructor() ERC721("Autopassport", "Pass") {}

    /**
     * Creates a track record of a new car. 
     * Transaction will fail (and burn gas!) if the car already exists.
     */

    function createAutoPassport(address to, string memory brand, string memory model, string memory vin, string memory color_code, string memory dateOfManufacture, string memory uriIpfsUrl) public onlyOwner {
        require(_vinToTokenId[vin] == 0, "Car with this VIN already exists");
        address owner = to;
        uint256 tokenId = _tokenIdCounter.current();
        _cars[tokenId] = Car(brand, model, vin, color_code, dateOfManufacture, 0);
        _vinToTokenId[vin] = tokenId;
        _tokenIdCounter.increment();
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, uriIpfsUrl);

        emit Creation(to, tokenId, vin);
    } 

    // function editAutoPassport(uint mileage, Array reparaciones, Array mantenimientos) public onlyOwner {
    //     require(_vinToTokenId[vin] == 0, "Car with this VIN already exists");
    //     address owner = to;
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _cars[tokenId] = Car(brand, model, vin, color_code, dateOfManufacture, 0);
    //     _vinToTokenId[vin] = tokenId;
    //     _tokenIdCounter.increment();
    //     _safeMint(owner, tokenId);
    //     _setTokenURI(tokenId, uriIpfsUrl);

    //     emit Creation(to, tokenId, vin);
    // } 
    // function getCarByTokenId(uint256 tokenId) public view returns(string memory brand, string memory model, string memory vin, string memory color_code, uint dateOfManufacture, uint mileage) {
    //     Car storage carObject = _cars[tokenId];
    //     brand = carObject.brand;
    //     model = carObject.model;
    //     vin = carObject.vin;
    //     color_code = carObject.color_code;
    //     dateOfManufacture = carObject.dateOfManufacture;
    //     mileage = carObject.mileage;
    // }

    // function getCarByVIN(string memory vin) public view returns(uint256 tokenId, string memory brand, string memory model, string memory color_code, uint dateOfManufacture, uint mileage) {
    //     tokenId = _vinToTokenId[vin];
    //     Car storage carObject = _cars[tokenId];
    //     brand = carObject.brand;
    //     model = carObject.model;
    //     vin = carObject.vin;
    //     color_code = carObject.color_code;
    //     dateOfManufacture = carObject.dateOfManufacture;
    //     mileage = carObject.mileage;
    // }

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function toString(uint256 value) internal pure returns (string memory) {
    if (value == 0) {
        return "0";
    }

    uint256 temp = value;
    uint256 digits;

    while (temp != 0) {
        digits++;
        temp /= 10;
    }

    bytes memory buffer = new bytes(digits);

    while (value != 0) {
        digits -= 1;
        buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
        value /= 10;
    }

    return string(buffer);
}

    function toString(address account) internal pure returns (string memory) {
        bytes32 accountBytes = bytes32(uint256(uint160(account)));

        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);

        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(accountBytes[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(accountBytes[i + 12] & 0x0f)];
        }

        return string(str);
    }


    function addressToString(address account) internal pure returns (string memory) {
        bytes32 accountBytes = bytes32(uint256(uint160(account)));

        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);

        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(accountBytes[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(accountBytes[i + 12] & 0x0f)];
        }

        return string(str);
    }


    function formatUint2Digits(uint256 number) internal pure returns (string memory) {
        if (number < 10) {
            return string(abi.encodePacked("0", toString(number)));
        } else {
            return toString(number);
        }
    }

    function getFormattedDate() public view returns (string memory) {
        uint256 timestamp = getCurrentTimestamp();

        uint256 secondsPerDay = 24 * 60 * 60;

        uint256 numDays = timestamp / secondsPerDay;

        string memory formattedDate = string(
            abi.encodePacked(
                formatUint2Digits(numDays % 31 + 1),
                "/",
                formatUint2Digits((numDays / 31) % 12 + 1),
                "/",
                toString(1970 + numDays / 365)
            )
        );

        return formattedDate;
    }


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}