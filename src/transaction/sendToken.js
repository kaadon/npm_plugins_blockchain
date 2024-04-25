import ___client_infura from "../client/infura";

const web3Client = ___client_infura('77e71e4583ec473f8f8c2afd3feea9c9', 'v3', 'sepolia')
//contract = {
//
//
// }
const sendToken = async (web3Client, toAddress, fromAddress, PrivateKey, contract, number, limitGas = 9500) => {
    let userBalance = 0 //余额
    let myContract = new web3Client.eth.Contract(JSON.parse(contract.ABI), contract.address);
    userBalance = web3Client.utils.fromWei(await myContract.methods.balanceOf(fromAddress).call(), contract.EtherUnits)
    if (userBalance < number) {
        return Promise.reject('The balance is insufficient')
    }
    var getGasPrice = await web3Client.eth.getGasPrice()
    let txCount = await web3Client.eth.getTransactionCount(fromAddress)
    let amount = web3Client.utils.toWei(number.toString(), contract.EtherUnits)
   let limitGass =await  myContract.methods.transfer(toAddress, amount).estimateGas({from: fromAddress})
    const txObject = {
        nonce: web3Client.utils.toHex(txCount),
        gasPrice: web3Client.utils.toHex(getGasPrice),
        gasLimit: limitGass,
        to: contract.address,
        chainId: 11155111,
        data: await myContract.methods.transfer(toAddress, amount).encodeABI()
    }
    let txData = await web3Client.eth.accounts.signTransaction(txObject, PrivateKey)

    if (!txData.rawTransaction) {
        return Promise.reject('The transaction failed')
    } else {
        let MuiTXHash2 = await web3Client.eth.sendSignedTransaction(txData.rawTransaction);
        return Promise.resolve(MuiTXHash2)
    }
}


export default sendToken