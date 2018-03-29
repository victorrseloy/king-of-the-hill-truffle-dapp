const initialState = {
    lastMessage:"",
    messages:[],
    price:0
}


const messageReducer = (state = initialState, action) => {
     switch(action.type){
         case "LOAD-LAST-MESSAGE-SUCCESS":
             var newState = {...state};
             newState.messages = [...newState.messages]
             newState.lastMessage = action.message
             return newState;
         case "LOAD-ALL-MESSAGES-SUCCESS":
             var newState = {...state}
             if(action.messages && action.messages.length>1){
                 newState.messages = [...action.messages]
             }
             else{
                 newState.messages = [action.messages]
             }
             return newState;
         case "LOAD-PRICE-SUCCESS":
             var newState = {...state};
             newState.messages = [...newState.messages]
             newState.price = action.price
             return newState;
         default:
             return state;
    }
    return initialState
}

export default messageReducer;
