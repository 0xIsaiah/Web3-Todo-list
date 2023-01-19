// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;

    constructor(
        address _payer, 
        address payable _payee,
        uint _amount
        ) {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
    }

       // function to allower payer to send money into the escrow
    function deposit() payable public {
        require(msg.sender == payer, 'Sender must be the payer');
        require(address(this).balance <= amount);
    } 

    function release() public { 
        // ensure the escrow has recieved all the moeny/100% fuded before it can be released
        require(address(this).balance == amount, 'cannot release funds before thevfull amount has been sent');
        // ensure release funtion is only triggered by the lawyer
        require(msg.sender == lawyer, 'only lawyer can release funds');
        payee.transfer(amount);
    }

    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }
}