/**
 * @param web3Client //web3客户端
 * @param toAddress  //转入地址
 * @param fromAddress //转出地址
 * @param PrivateKey //转出地址对应的私钥
 * @param contract = { //代币信息
 *  ABI: 代币的ABI的JSON 字符串
 *  address: 代币的合约地址
 *  EtherUnits: 代币单位
 *  symbol: "USDC",
 *  decimals: 6,
 * }
 * @param number //转账数量
 */
const sendToken = async (web3Client, toAddress, fromAddress, PrivateKey, contract, number = 'all') => {
    let userBalance = 0 //余额
    try {
        //逻辑代码
        let myContract = new web3Client.eth.Contract(JSON.parse(contract.ABI), contract.address);
        userBalance = web3Client.utils.fromWei(await myContract.methods.balanceOf(fromAddress).call(), contract.EtherUnits)
        if (number === 'all') number = userBalance
        if (userBalance < number) {
            throw new Error('The balance is insufficient')
        }
        let getGasPrice = await web3Client.eth.getGasPrice()
        let txCount = await web3Client.eth.getTransactionCount(fromAddress)
        let amount = web3Client.utils.toWei(number.toString(), contract.EtherUnits)
        let txObject = {
            nonce: web3Client.utils.toHex(txCount),
            gasPrice: web3Client.utils.toHex(getGasPrice),
            gasLimit: await myContract.methods.transfer(toAddress, amount).estimateGas({from: fromAddress}),
            to: contract.address,
            chainId: 11155111,
            data: await myContract.methods.transfer(toAddress, amount).encodeABI()
        }
        let txData = await web3Client.eth.accounts.signTransaction(txObject, PrivateKey)
        if (!txData.rawTransaction) {
            throw new Error('The transaction failed')
        }
        let MuiTXHash2 = await web3Client.eth.sendSignedTransaction(txData.rawTransaction);
        return Promise.resolve(MuiTXHash2)
    } catch (e) {
        return Promise.reject(e)
    }
};
export default sendToken