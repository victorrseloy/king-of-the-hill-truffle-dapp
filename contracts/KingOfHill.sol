pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
//utility function downloaded from github
import './Strings.sol';

/**
* This smart contract contains the main logic to handle the king of hill application
*
*/
contract KingOfHill is Killable{
    using strings for *;
    string[] public messages;
    uint private price = 10 szabo;
    uint increasingAmount = 10 szabo;

    event PublishMessage(
       string message,
       uint price
    );

    /*
    * this function places a new message to the block chain
    * it will validate if the sender has enough funds to place the message
    * plus messages cannot contain "-" as this is the character that will be
    * used to delimit the array with all the strings  
    * @message - messgage to be posted
    */
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

    /**
    * gets the current price to post a message
    * @return the current price to post a message
    */
    function getPrice()
    constant
    public
    returns (uint)
    {
        return price;
    }

    /**
    * gets the current message
    * @return the current message
    */
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

    /**
    * This method returns all the current messages contained on the contract as a single
    * string delimited by -, we need to do this because solidity cannot return nested dynamic
    * arrays
    * @return - a single string deilimited by - 
    */
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