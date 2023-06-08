// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
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
        string date_of_manufacture;
        string warranty_expiration_date;
        string fuel_type;
        uint mileage;
        string[] repair_history;
        string[] maintenance_history;
        string last_update;
    }

    Counters.Counter private _tokenIdCounter;
    mapping (uint256 => Car) private _cars;
    mapping (string => uint256) private _vinToTokenId;
    mapping (string => bool) private _isVinUsed;
    mapping (uint256 => bool) private _isTokenIdUsed;

    constructor() ERC721("Autopassport", "Pass") {}

    /**
     * Creates a track record of a new car. 
     * Transaction will fail (and burn gas!) if the car already exists.
     */
    function createAutoPassport(
        address to, 
        string memory brand, 
        string memory model, 
        string memory vin, 
        string memory color_code, 
        string memory date_of_manufacture, 
        string memory warranty_expiration_date, 
        string memory fuel_type, 
        string memory last_update, 
        string memory uriIpfsUrl) public onlyOwner {
        require(_isVinUsed[vin] == false, "Car with this VIN already exists");
        uint256 tokenId = _tokenIdCounter.current() + 1;
        require(_isTokenIdUsed[tokenId] == false, "Car with this tokenId already exists");
        _cars[tokenId] = Car(
            brand, 
            model, 
            vin, 
            color_code, 
            date_of_manufacture, 
            warranty_expiration_date, 
            fuel_type, 
            0, 
            new string[](0), 
            new string[](0),
            last_update);
        _vinToTokenId[vin] = tokenId;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uriIpfsUrl);
        _isVinUsed[vin] = true;
        _isTokenIdUsed[tokenId] = true;
        emit Creation(to, tokenId, vin);
    }

    function updateAutoPassport(
        string memory vin,
        uint mileage,
        string memory newRepair,
        string memory newMaintenance,
        string memory newURI,
        string memory last_update
    ) public {
        require(_isVinUsed[vin] == true, "Car with this VIN does not exist");
        uint256 tokenId = _vinToTokenId[vin];
        Car storage carObject = _cars[tokenId];
        require(
            carObject.mileage < mileage,
            "New mileage value must be greater than the current value"
        );
        carObject.mileage = mileage;
        if (bytes(newRepair).length > 0 && keccak256(bytes(newRepair)) != keccak256(bytes("undefined"))) {
            carObject.repair_history.push(newRepair);
        }
        if (bytes(newMaintenance).length > 0 && keccak256(bytes(newMaintenance)) != keccak256(bytes("undefined"))) {
            carObject.maintenance_history.push(newMaintenance);
        }
        _setTokenURI(tokenId, newURI);
        carObject.last_update = last_update;
    }      

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * Read Functions.
     */

    function getCarByTokenId(
        uint256 tokenId
    )
        public
        view
        returns (
            Car memory objCar
        )
    {   
        require(_isTokenIdUsed[tokenId] == true, "Car with this tokenId does not exist");
        Car storage carObject = _cars[tokenId];
        objCar = Car(
            carObject.brand, 
            carObject.model, 
            carObject.vin,
            carObject.color_code, 
            carObject.date_of_manufacture,
            carObject.warranty_expiration_date,
            carObject.fuel_type,
            carObject.mileage,
            carObject.repair_history,
            carObject.maintenance_history,
            carObject.last_update);
    }

    function getObjCarByVIN(
        string memory vin
    )
        public
        view 
        returns (
            uint256 tokenId,
            Car memory objCar,
            string memory uri
        )
    {
        require(_isVinUsed[vin] == true, "Car with this VIN does not exist");
        tokenId = _vinToTokenId[vin];
        Car storage carObject = _cars[tokenId];
        objCar = Car(
            carObject.brand, 
            carObject.model, 
            carObject.vin,
            carObject.color_code, 
            carObject.date_of_manufacture,
            carObject.warranty_expiration_date,
            carObject.fuel_type,
            carObject.mileage,
            carObject.repair_history,
            carObject.maintenance_history,
            carObject.last_update);
        uri = super.tokenURI(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}