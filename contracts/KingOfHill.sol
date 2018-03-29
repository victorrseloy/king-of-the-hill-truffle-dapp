pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './Strings.sol';


contract KingOfHill is Killable{
    using strings for *;
    string[] public messages;
    uint private price = 10 szabo;
    uint increasingAmount = 10 szabo;

    event PublishMessage(
       string message,
       uint price
    );

    function addMessage(string message)
    payable
    public
    {
        assert(msg.value>=price);
        assert(!message.toSlice().contains("-".toSlice()));
        msg.sender.transfer(msg.value - price);
        price = price+increasingAmount;
        messages.push(message);
        PublishMessage(message,price);
    }

    function getPrice()
    constant
    public
    returns (uint)
    {
        return price;
    }


    function getLastMessage()
    constant
    public
    returns (string)
    {
        if(messages.length>0){
            return messages[messages.length-1];
        }
        return "No message yet";
    }

    function getAllMessages()
    constant
    public
    returns(string)
    {
        string memory returnval = "";
        for(uint i = 0;i<messages.length;i++){
            returnval = returnval.toSlice().concat("-".toSlice());
            returnval = returnval.toSlice().concat(messages[i].toSlice());
        }
        return returnval;
    }
}