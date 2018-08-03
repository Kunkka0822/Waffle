[![Build Status](https://travis-ci.com/EthWorks/Waffle.svg?token=xjj4U84eSFwEsYLTc5Qe&branch=master)](https://travis-ci.com/EthWorks/Waffle)

# Ethereum Waffle
Sweeter and simpler than [truffle](https://github.com/trufflesuite/truffle). Works with [ethers-js](https://github.com/ethers-io/ethers.js/). Taste best with chai and ES6.

## Philosophy
* Simpler: Set of helpers rather than framework
* Sweeter: Easy to customize and extend

## Features:
* Build, deploy link and test solidity based smart contracts
* No need to run mock rpc server
* Easily import contracts from other npms
* Coming soon: Parallel testing

## Install:
To start using with npm, type:
```sh
npm i ethereum-waffle
```

or with Yarn:
```sh
yarn add ethereum-waffle
```

## Step by step guide

### First test

```js
import chai from 'chai';
import {createMockProvider, deployContract, getWallets} from 'ethereum-waffle';
import ethers from 'ethers';
import BasicToken from './contracts/BasicToken';

const {expect} = chai;

describe('Example', () => {
  let provider;
  let token;
  let wallet;

  beforeEach(async () => {
    provider = createMockProvider();
    [wallet] = await getWallets(provider);
    token = await deployContract(wallet, BasicToken);  
  });
  
  it('Should be able to test', async () => {
    const actualBalance = await token.balanceOf(wallet.address);
    expect(actualBalance.eq(0)).to.be.true;
  });  
});
```

Run tests:
```sh
yarn waffle:test
```
