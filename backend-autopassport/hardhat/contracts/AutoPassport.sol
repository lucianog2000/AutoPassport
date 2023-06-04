// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * Autopassport car tokenizer 
 */
contract AutoPassport is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    event Creation(
        address indexed from,
        uint256 indexed tokenId,
        string vin
    );
    event RepairAdded(string indexed vin, string repair_history);
    event MaintenanceAdded(string indexed vin, string maintenance_history);

    struct Car {
        string brand;
        string model;
        string vin;
        string colorCode;
        string dateOfManufacture;
        uint mileage;
        string[] repairHistory;
        string[] maintenanceHistory;
    }

    Counters.Counter private _tokenIdCounter;
    mapping (string => uint256) private _vinToTokenId;
    mapping (uint256 => Car) private _cars;

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
        string memory colorCode, 
        string memory dateOfManufacture, 
        string memory warrantyExpirationDate, 
        string memory fuelType, 
        string memory lastUpdate, 
        string memory uriIpfsUrl) public onlyOwner {
        require(_vinToTokenId[vin] == 0, "Car with this VIN already exists");
        uint256 tokenId = _tokenIdCounter.current();
        _cars[tokenId] = Car(
            brand, 
            model, 
            vin, 
            colorCode, 
            dateOfManufacture, 
            warrantyExpirationDate, 
            fuelType, 
            0, 
            new string[](0), 
            new string[](0),
            lastUpdate);
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _vinToTokenId[vin] = tokenId;
        _tokenIdCounter.increment();

        emit Creation(to, tokenId, vin);
    }

    /**
     * Updates the current kilometers of the car. Transactions fail and burn gas if
     * the new kilometer value is lower than the old one.
     */
    function updateMileage(string memory vin, uint mileage) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        Car storage carObject = _cars[tokenId];
        require(
            carObject.mileage < mileage,
            "New kilometers value must be greater than the current value"
        );
        carObject.mileage = mileage;
    }

    /**
     * Updates the maintenance of the car.
     */
    function addMaintenance(
        string memory vin,
        string memory newMaintenance
    ) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(
            _msgSender() == ownerOf(tokenId),
            "Only the owner can add maintenance"
        );

        Car storage carObject = _cars[tokenId];
        require(
            bytes(newMaintenance).length > 0,
            "New maintenance string must not be empty"
        );

        // Append the newMaintenance variable to the maintenance array
        carObject.maintenanceHistory.push(newMaintenance);

        // Emit the MaintenanceAdded event
        emit MaintenanceAdded(vin, newMaintenance);
    }

    /**
     * Add Repairs of the car.
     */
    function addRepair(string memory vin, string memory newRepair) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(
            _msgSender() == ownerOf(tokenId),
            "Only the owner can add a repair"
        );

        Car storage carObject = _cars[tokenId];

        carObject.repairHistory.push(newRepair);
        require(
            bytes(newRepair).length > 0,
            "New repair string must not be empty"
        );

        emit RepairAdded(vin, newRepair);
    }

    function updateTokenURI(uint256 tokenId, string memory newURI) public {
        _setTokenURI(tokenId, newURI);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * Read Functions.
     */
    function getCarByTokenId(uint256 tokenId)
        public
        view
        returns (
            string memory brand,
            string memory model,
            string memory vin,
            string memory colorCode,
            string memory dateOfManufacture,
            string memory warrantyExpirationDate,
            string memory fuelType,
            uint mileage,
            string[] memory repairHistory,
            string[] memory maintenanceHistory,
            string memory lastUpdate
        )
    {
        Car storage carObject = _cars[tokenId];
        brand = carObject.brand;
        model = carObject.model;
        vin = carObject.vin;
        colorCode = carObject.colorCode;
        dateOfManufacture = carObject.dateOfManufacture;
        warrantyExpirationDate = carObject.warrantyExpirationDate;
        fuelType = carObject.fuelType;
        mileage = carObject.mileage;
        repairHistory = carObject.repairHistory;
        maintenanceHistory = carObject.maintenanceHistory;
        lastUpdate = carObject.lastUpdate;
    }

    function getCarByVIN(string memory vin)
        public
        view
        returns (
            uint256 tokenId,
            string memory brand,
            string memory model,
            string memory colorCode,
            string memory dateOfManufacture,
            string memory warrantyExpirationDate,
            string memory fuelType,
            uint mileage,
            string[] memory repairHistory,
            string[] memory maintenanceHistory,
            string memory lastUpdate
        )
    {
        tokenId = _vinToTokenId[vin];
        Car storage carObject = _cars[tokenId];
        brand = carObject.brand;
        model = carObject.model;
        colorCode = carObject.colorCode;
        dateOfManufacture = carObject.dateOfManufacture;
        warrantyExpirationDate = carObject.warrantyExpirationDate;
        fuelType = carObject.fuelType;
        mileage = carObject.mileage;
        repairHistory = carObject.repairHistory;
        maintenanceHistory = carObject.maintenanceHistory;
        lastUpdate = carObject.lastUpdate;
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