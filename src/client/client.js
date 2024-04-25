import {Web3} from "web3";
/*
* 获取client
* */
const client = (url) => {
   return  new Web3(new Web3.providers.HttpProvider(url));
}

export default client;