import KingOfHillContract from '../../../../build/contracts/KingOfHill.json'
import store from '../../../store'
const contract = require('truffle-contract')


/**
 * this module contains all actions related to the KingOfHill smart contract
 */


/**
 *
 * create an action to notify the reducers about
 * the last message load success
 *
 * @param message - last loaded message
 * @returns {{type: string, message: *}} -  the action that will be sent to the dispatcher
 */
function loadLastMessageSuccess(message) {
    return {
        type: "LOAD-LAST-MESSAGE-SUCCESS",
        message
    }
}

/**
 *
 * create an action to notify the reducers about
 * the last message array success
 * this array contain all the messages
 *
 * @param messages - array with all loaded messages
 * @returns {{type: string, message: *}} -  the action that will be sent to the dispatcher
 */
function loadAllMessagesPageSuccess(messages) {
    return {
        type: "LOAD-ALL-MESSAGES-SUCCESS",
        messages
    }
}

/**
 *
 * create an action to notify the reducers about
 * the current price load success
 *
 * @param price - price to post a new message
 * @returns {{type: string, message: *}} -  the action that will be sent to the dispatcher
 */
function loadPriceSuccess(price){
    return {
        type: "LOAD-PRICE-SUCCESS",
        price
    }
}

/**
 * connects with the blockchain to load the last message
 * this returns an async function that shall be used
 * along with redux thunk
 *
 * @returns {Function}
 */
export function loadLastMessage(){
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {
        return async function(dispatch){
            const kingOfHillContractDefinition = contract(KingOfHillContract)
            kingOfHillContractDefinition.setProvider(web3.currentProvider)
            web3.eth.getCoinbase(async (error,coinbase) =>{
                if(error){
                    console.error(error);
                }
                let kingOfHillInstance = await kingOfHillContractDefinition.deployed();
                try{
                    let message = await kingOfHillInstance.getLastMessage({from: coinbase});
                    dispatch(loadLastMessageSuccess(message))

                }
                catch(err){
                    console.log(err)
                }
            });
        }
    }
}


/**
 * connects with the blockchain to load all the existing messages
 * this returns an async function that shall be used
 * along with redux thunk
 *
 * @returns {Function}
 */
export function loadAllMessages(){
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {
        return async function(dispatch){
            const kingOfHillContractDefinition = contract(KingOfHillContract)
            kingOfHillContractDefinition.setProvider(web3.currentProvider)
            web3.eth.getCoinbase(async (error,coinbase) =>{
                if(error){
                    console.error(error);
                }
                let kingOfHillInstance = await kingOfHillContractDefinition.deployed();
                try{
                    let messages = await kingOfHillInstance.getAllMessages({from: coinbase});
                    dispatch(loadAllMessagesPageSuccess(messages.split("-").slice(1).reverse()))

                }
                catch(err){
                    console.log(err)
                }
            });
        }
    }
}

/**
 * connects with the blockchain to load the current price to post a message
 * this returns an async function that shall be used
 * along with redux thunk
 *
 * @returns {Function}
 */
export function loadCurrentPrice(){
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {
        return async function(dispatch){
            const kingOfHillContractDefinition = contract(KingOfHillContract)
            kingOfHillContractDefinition.setProvider(web3.currentProvider)
            web3.eth.getCoinbase(async (error,coinbase) =>{
                if(error){
                    console.error(error);
                }
                let kingOfHillInstance = await kingOfHillContractDefinition.deployed();
                try{
                    let price = await kingOfHillInstance.getPrice({from: coinbase});
                    price = web3.fromWei(price,'ether');
                    dispatch(loadPriceSuccess(price))

                }
                catch(err){
                    console.log(err)
                }
            });
        }
    }
}


/**
 * this function posts a message to the blockchain
 * this returns an async function that shall be used
 * along with redux thunk
 *
 * @param message - message to be posted to the blockchain
 * @returns {Function}
 */
export function addMessage(message){
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {
        return async function(dispatch){
            const kingOfHillContractDefinition = contract(KingOfHillContract)
            kingOfHillContractDefinition.setProvider(web3.currentProvider)
            web3.eth.getCoinbase(async (error,coinbase) =>{
                if(error){
                    console.error(error);
                }
                let kingOfHillInstance = await kingOfHillContractDefinition.deployed();
                try{
                    let price = await kingOfHillInstance.getPrice({from: coinbase});
                    await kingOfHillInstance.addMessage(message, {from: coinbase,value: price})
                    kingOfHillInstance.PublishMessage().watch(
                        function(error, result){
                            if (!error)
                            {
                                dispatch(loadLastMessageSuccess(result.args.message))
                                dispatch(loadPriceSuccess(web3.fromWei(result.args.price,'ether')));
                            }
                        })
                }
                catch(err){
                    console.log(err)
                }
            });
        }
    }
}