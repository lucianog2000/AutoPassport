// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract PassportAccess {
    enum AccessLevel {
        None,
        Workshops,
        Owner
    }

    mapping(address => AccessLevel) public accessLevels;

    event MemberAdded(address member);
    event MemberRemoved(address member);

    string[] private info;
    address public owner;

    constructor() {
        owner = msg.sender;
        accessLevels[msg.sender] = AccessLevel.Owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyWorkshops() {
        require(accessLevels[msg.sender] >= AccessLevel.Workshop, "Only Workshops");
        _;
    }

    event InfoChange(string oldInfo, string newInfo);

    function getInfo(uint256 index) public view returns (string memory) {
        require(index < info.length, "Invalid index");
        return info[index];
    }

    function addInfo(string memory _info) public onlyWorkshops {
        info.push(_info);
        emit InfoChange("", _info);
    }

    function setInfo(uint256 index, string memory _info) public onlyWorkshops{
        require(index < info.length, "Invalid index");
        emit InfoChange(info[index], _info);
        info[index] = _info;
    }

    function listInfo() public view returns (string[] memory) {
        return info;
    }

    function delWorkshop(address _workshop) public onlyOwner {
        accessLevels[_workshop] = AccessLevel.None;
        emit WorkshopRemoved(_workshop);
    }

    function addMember(address _workshop) public onlyOwner {
        accessLevels[_workshop] = AccessLevel.Workshop;
        emit WorkshopAdded(_workshop);
    }

}