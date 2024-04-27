
const scanBlock = async (web3Client, blockNumber = null, contract) => {
    let newBlock = await web3Client.client.eth.getBlockNumber()
    if (blockNumber >= newBlock) {
        throw new Error('The block has not been updated')
    }
    const {transactions, timestamp} = await web3Client.client.eth.getBlock(blockNumber)
    let blockTransactions = []
    for (const transaction of transactions) {
        const transactionData = {
            txHash: "",
            blockHash: "",
            blockNumber: 0,
            fromAddress: "",
            toAddress: "",
            amount: 0,
            type: 'ETH',
        }
        const {
            hash,
            blockHash,
            blockNumber,
            from,
            to,
            value,
            data
        } = await web3Client.client.eth.getTransaction(transaction)
        if (data === '0x') {
            transactionData.toAddress = to
            transactionData.amount = web3Client.client.utils.fromWei(value, 'ether')
        } else {
            if ('0xa9059cbb' === data.substring(0,10)) {
                transactionData.toAddress = '0x' + data.substring(34, 74).toString()
                transactionData.amount = web3Client.client.utils.fromWei(web3Client.client.utils.hexToNumberString('0x' + data.substring(74, data.length)), contract?.decimals || 'ether')
                transactionData.type = contract?.symbol || transactionData.toAddress
                transactionData.contract = to
            }
        }
        if (!transactionData.toAddress) continue;
        transactionData.txHash = hash
        transactionData.blockHash = blockHash
        transactionData.blockNumber = blockNumber.toString()
        transactionData.fromAddress = from.toString()
        transactionData.timestamp = timestamp.toString()
        blockTransactions.push(transactionData)
    }
    return Promise.resolve(blockTransactions)
}
export default scanBlock
