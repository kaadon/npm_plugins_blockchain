import {default as __client} from "./client";

const netWorks = {
    mainnet: {
        chainId: 1,
        chainName: "Mainnet",
        rpcUrl: "https://mainnet.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://etherscan.io",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    sepolia: {
        chainId: 11155111,
        chainName: "Sepolia Testnet",
        rpcUrl: "https://sepolia.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://sepolia.etherscan.io",
        nativeCurrency: {
            name: "Sepolia Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    holesky: {
        chainId: 17000,
        chainName: "Holesky Testnet",
        rpcUrl: "https://holesky.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://holesky.etherscan.io",
        nativeCurrency: {
            name: "Holesky Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    lineaGoerli: {
        chainId: 59144,
        chainName: "Linea Goerli Testnet",
        rpcUrl: "https://linea-goerli.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://goerli.lineascan.build",
        nativeCurrency: {
            name: "Linea Goerli Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    lineaMainnet:{
        chainId: 59144,
        chainName: "Linea Mainnet",
        rpcUrl: "https://linea-mainnet.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://lineascan.build",
        nativeCurrency: {
            name: "Linea Mainnet Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    lineaSepolia:{
        chainId: 59144,
        chainName: "Linea Sepolia Testnet",
        rpcUrl: "https://linea-sepolia.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://sepolia.lineascan.build",
        nativeCurrency: {
            name: "Linea Sepolia Ether",
            symbol: "ETH",
            decimals: 18
        }
    },
    polygonMainnet:{
        chainId: 137,
        chainName: "Polygon Mainnet",
        rpcUrl: "https://polygon-mainnet.infura.io/VERSION/YOUR_INFURA_PROJECT_ID",
        blockExplorerUrl: "https://polygonscan.com",
        nativeCurrency: {
            name: "Matic",
            symbol: "MATIC",
            decimals: 18
        }
    }
}
const infura = (YOUR_INFURA_PROJECT_ID, netWork = "mainnet", version = 'v3') => {
    console.log(YOUR_INFURA_PROJECT_ID,netWork,version,netWorks.hasOwnProperty(netWork))
    if (!netWorks.hasOwnProperty(netWork)) throw new Error("Network not supported");
    return {
        client: __client(netWorks[netWork].rpcUrl.replace("YOUR_INFURA_PROJECT_ID", YOUR_INFURA_PROJECT_ID).replace("VERSION", version)),
        netWork: netWorks[netWork]
    };
}
export default infura;