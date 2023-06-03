// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * Autopassport car tokenizer
 */
contract AutoPassportW is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    event Creation(address indexed from, uint256 indexed tokenId, string vin);
    event MaintenanceAdded(string indexed vin, string maintenance);
    event RepairAdded(string indexed vin, string repairs);

    // event updateOfUpdates(
    //     address indexed owner,
    //     uint256 indexed tokenId,
    //     string newCar,
    //     string[] maintenance,
    //     string[] repairs
    // );

    struct Car {
        string vin;
        uint kilometers;
        string[] maintenance;
        string[] repairs;
    }

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => Car) private _cars;
    mapping(string => uint256) private _vinToTokenId;

    constructor() ERC721("Autopassport", "Pass") {
        // owner = msg.sender;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://gateway.pinata.cloud/ipfs/QmZqVGagDyCDR8JkoHNbkZas7PoW6JGYrEhyKuu5wweR24?_gl=1*86iwxl*rs_ga*OTVlZGJkZmEtZGRlYS00NTE3LWI3NmQtMmM1OGI2OTYzYmNm*rs_ga_5RMPXG14TE*MTY4MzQwOTQ3MS4yMC4xLjE2ODM0MTAwNzkuNjAuMC4w";
    }

    /**
     * Creates a track record of a new car.
     * Transaction will fail (and burn gas!) if the car VIN already exists.
     */

    function createCar(string memory vin) public onlyOwner {
        require(_vinToTokenId[vin] == 0, "Car with this VIN already exists");
        uint256 tokenId = _tokenIdCounter.current();
        _cars[tokenId] = Car(vin, 0, new string[](0), new string[](0));
        _vinToTokenId[vin] = tokenId;
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        emit Creation(msg.sender, tokenId, vin);
    }

    /**
     * Updates the current kilometers of the car. Transactions fails and burns gas if
     * the new kilometer value is lower than the old one.
     */
    //    function updateOfUpdates(string memory vin, uint kilometer,  )

    /**
     * Updates the current kilometers of the car. Transactions fails and burns gas if
     * the new kilometer value is lower than the old one.
     */
    function updateKilometers(string memory vin, uint kilometers) public {
        uint256 tokenId = _vinToTokenId[vin];
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        Car storage carObject = _cars[tokenId];
        require(
            carObject.kilometers < kilometers,
            "New kilometers value must be greater than the current value"
        );
        carObject.kilometers = kilometers;
    }

    /**
     * Updates the mantainance of the car.
     */
    function addManteinance(
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
        carObject.maintenance.push(newMaintenance);

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

        carObject.repairs.push(newRepair);
        require(
            bytes(newRepair).length > 0,
            "New repair string must not be empty"
        );

        emit RepairAdded(vin, newRepair);
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
            string memory vin,
            uint kilometers,
            string[] memory maintenance,
            string[] memory repairs
        )
    {
        Car storage carObject = _cars[tokenId];
        vin = carObject.vin;
        kilometers = carObject.kilometers;
        maintenance = carObject.maintenance;
        repairs = carObject.repairs;
    }

    function getCarByVIN(
        string memory vin
    )
        public
        view
        returns (
            uint256 tokenId,
            uint kilometers,
            string[] memory maintenance,
            string[] memory repairs
        )
    {
        tokenId = _vinToTokenId[vin];
        Car storage carObject = _cars[tokenId];
        kilometers = carObject.kilometers;
        repairs = carObject.repairs;
        maintenance = carObject.maintenance;
    }
}
