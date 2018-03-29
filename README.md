# king-of-the-hill-truffle-dapp



This is a simple dapp that allow people pay to post their messages as, only the last message will be shown in the home
and everytime the price to post a message increases.


![alt text](https://raw.githubusercontent.com/victorrseloy/king-of-the-hill-truffle-dapp/master/static/recording.gif)

It uses the following conpcets:
* react
* redux
* react router
* solidity
* web3
* truffle
* webpack

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Install the node dependencies.
    ```javascript
    npm install
    ```

3. install and run ganache
    [https://github.com/trufflesuite/ganache](https://github.com/trufflesuite/ganache)


4. compile the contracts
    ```javascript
    truffle compile
    ```

5. deploy contracts
    ```javascript
    truffle migrate
    ```

6. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

 7. Do not forget to setup your metamask, you can read more on this [link](http://truffleframework.com/tutorials/truffle-and-metamask)
 






