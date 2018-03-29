import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'
import * as message from './message/ui/messagelist/MessageListActions'

// Layouts
import App from './App'
import LastMessageScreen from './message/layout/LastMessageScreen'
import AllMessagesScreen from './message/layout/AllMessagesScreen'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
  store.dispatch(message.loadLastMessage())
  store.dispatch(message.loadCurrentPrice())
  store.dispatch(message.loadAllMessages())
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={LastMessageScreen} />
          <Route path="allMessages" component={AllMessagesScreen} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)

