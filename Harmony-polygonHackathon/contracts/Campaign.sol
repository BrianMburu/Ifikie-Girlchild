// SPDX-License-Identifier: MIT
pragma solidity ^0.4.24;

contract CampaignFactory {
 address[] public deployedCampaigns;

    function createCampaign() public {
 address newCampaign = new Campaign(msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address) {
        return deployedCampaigns[0];
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(address creator) public {
        manager = creator;
    }

    function donate() public payable {
        require(msg.value);

    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false
        });

        requests.push(newRequest);
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}