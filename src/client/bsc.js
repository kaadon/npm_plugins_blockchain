import {default as __client} from "./client";

const netWorks = {
    mainnet: {
        chainId: 56,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "Binance Coin",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrl: "https://bsc-dataseed.binance.org/",
        blockExplorerUrl: "https://bscscan.com/"
    },
    testnet: {
        chainId: 97,
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "Binance Coin",
            symbol: "tBNB",
            decimals: 18
        },
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        blockExplorerUrl: "https://testnet.bscscan.com/"
    }
}


const bscClient = (netWork = 'mainnet') => {
    if (!netWorks.hasOwnProperty(netWork)) throw new Error("Network not supported");
    return {
        client: __client(netWorks[netWork].rpcUrl),
        netWork: netWorks[netWork]
    }
}
export default bscClient;