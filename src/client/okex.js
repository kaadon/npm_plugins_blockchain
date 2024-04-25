import {default as __client} from "./client";
const netWorks = {
    mainnet: {
        rpcUrl: `https://exchainrpc.okex.org`,
        chainId: 66,
        chainName: "OKExChain Mainnet",
        nativeCurrency: {
            name: "OKExChain",
            symbol: "OKT",
            decimals: 18
        },
        blockExplorerUrls: `https://www.oklink.com/zh-cn/okc`
    },
    testnet: {
        rpcUrl: `https://exchaintestrpc.okex.org`,
        chainId: 65,
        chainName: "OKExChain Testnet",
        nativeCurrency: {
            name: "OKExChain",
            symbol: "OKT",
            decimals: 18
        },
        blockExplorerUrl: "https://www.oklink.com/zh-cn/okc-test"
    }
}
const okexClient = (netWork = "mainnet") => {
    if (!netWorks.hasOwnProperty(netWork)) throw new Error("Network not supported");
    return {
        client: __client(netWorks[netWork].rpcUrl),
        netWork: netWorks[netWork]
    }
}
export default okexClient;