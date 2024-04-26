/**
 * @param web3Client //web3实例
 * @param toAddress //转入地址
 * @param fromAddress //转出地址
 * @param PrivateKey //转出地址私钥
 * @param number //转出金额
 */
const sendEth = async (web3Client, toAddress, fromAddress, PrivateKey,  number) => {
    try {
        //逻辑代码
        let userBalance = await web3Client.eth.getBalance(fromAddress)//余额
        if (web3Client.utils.fromWei(userBalance,'ether') < number) {
            throw new Error('The balance is insufficient')
        }
        let amount = web3Client.utils.toWei(number.toString(), 'ether')
        let txObject = {
            from: fromAddress,
            to: toAddress,
            value: amount
        }
        txObject.gasPrice = await web3Client.eth.getGasPrice(txObject)
        let txData = await web3Client.eth.accounts.signTransaction(txObject, PrivateKey)
        if (!txData.rawTransaction) {
            throw new Error('The transaction failed')
        }
        return Promise.resolve(await web3Client.eth.sendSignedTransaction(txData.rawTransaction))
    } catch (e) {
        return Promise.reject(e)
    }
};


export default sendEth