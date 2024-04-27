/**
 * @param web3Client //web3实例
 * @param toAddress //转入地址
 * @param fromAddress //转出地址
 * @param PrivateKey //转出地址私钥
 * @param number //转出金额
 */
const sendEth = async (web3Client, toAddress, fromAddress, PrivateKey, number = 'all') => {
    try {
        //逻辑代码
        let userBalance = web3Client.client.utils.fromWei(await web3Client.client.eth.getBalance(fromAddress), 'ether')//余额
        if (number === 'all') number = userBalance
        if (userBalance < number) {
            throw new Error('The balance is insufficient')
        }
        let amount = web3Client.client.utils.toWei(number.toString(), 'ether')
        let txObject = {
            from: fromAddress,
            to: toAddress,
            value: amount
        }
        txObject.gasPrice = await web3Client.client.eth.getGasPrice(txObject)
        let txData = await web3Client.client.eth.accounts.signTransaction(txObject, PrivateKey)
        if (!txData.rawTransaction) {
            throw new Error('The transaction failed')
        }
        return Promise.resolve(await web3Client.client.eth.sendSignedTransaction(txData.rawTransaction))
    } catch (e) {
        return Promise.reject(e)
    }
};


export default sendEth