import KingOfHillContract from '../../../../build/contracts/KingOfHill.json'
import store from '../../../store'
const contract = require('truffle-contract')



function loadLastMessageSuccess(message) {
    return {
        type: "LOAD-LAST-MESSAGE-SUCCESS",
        message
    }
}

function loadAllMessagesPageSuccess(messages) {
    return {
        type: "LOAD-ALL-MESSAGES-SUCCESS",
        messages
    }
}

function loadPriceSuccess(price){
    return {
        type: "LOAD-PRICE-SUCCESS",
        price
    }
}


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
                    dispatch(loadAllMessagesPageSuccess(messages.split("-").slice(1)))

                }
                catch(err){
                    console.log(err)
                }
            });
        }
    }
}

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

// //delete
//
// export function getMessages() {
//     let web3 = store.getState().web3.web3Instance
//
//     // Double-check web3's status.
//     if (typeof web3 !== 'undefined') {
//
//         return function(dispatch) {
//             // Using truffle-contract we create the authentication object.
//             const messages = contract(KingOfHillContract)
//             messages.setProvider(web3.currentProvider)
//
//             // Declaring this for later so we can chain functions on Authentication.
//             var kingOfHillInstance
//
//             // Get current ethereum wallet.
//             web3.eth.getCoinbase((error, coinbase) => {
//                 // Log errors, if any.
//                 if (error) {
//                     console.error(error);
//                 }
//
//                 messages.deployed().then(async function(instance) {
//                     kingOfHillInstance = instance
//
//                     console.log(web3.toWei(1, "ether"))
//                     let price = await kingOfHillInstance.getPrice(0,{from:coinbase})
//                     console.log(price);
//                     kingOfHillInstance.addMessage("uepaaa", {from: coinbase,value: price})
//
//                     // Attempt to login user.
//                     kingOfHillInstance.getAllMessages(0,{from:coinbase})
//                         .then(function(result) {
//                             // If no error, login user.
//                             var messages = result.split("-")
//                             console.log(messages)
//
//                             dispatch(loadMessages(messages))
//
//                             // // Used a manual redirect here as opposed to a wrapper.
//                             // // This way, once logged in a user can still access the home page.
//                             // var currentLocation = browserHistory.getCurrentLocation()
//                             //
//                             // if ('redirect' in currentLocation.query)
//                             // {
//                             //     return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
//                             // }
//                             //
//                             // return browserHistory.push('/dashboard')
//                         })
//                         .catch(function(result) {
//                             // If error, go to signup page.
//                             console.error(result)
//
//                         })
//                 })
//             })
//         }
//     } else {
//         console.error('Web3 is not initialized.');
//     }
// }
