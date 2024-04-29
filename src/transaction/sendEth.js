const BigNumber = require('bignumber.js');

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
        const addressBalance= new BigNumber(await web3Client.client.eth.getBalance(fromAddress))
        if (number === 'all') {
            number = addressBalance
        }else {
            number = new BigNumber(web3Client.client.utils.toWei(number.toString(), 'ether'))
        }
        if (addressBalance.lt(number)) {
            throw new Error('The balance is not enough')
        }
        let txObject = {
            from: fromAddress,
            to: toAddress,
            value: number.toString(),
        }
        txObject.gasPrice = await web3Client.client.eth.getGasPrice(txObject)
        const fee = new BigNumber(web3Client.client.utils.hexToNumberString(txObject.gasPrice)).multipliedBy(21000).multipliedBy(10)
        if (new BigNumber(number).plus(fee).gt(addressBalance)) throw new Error('Not enough to cover the processing fee')
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