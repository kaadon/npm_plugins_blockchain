export const getBalance = async (web3Client, address, contract = null) => {
    try {
        //逻辑代码
        if (contract == null) {
            return Promise.resolve(await web3Client.eth.getBalance(address));
        } else {
            return Promise.resolve(web3Client.client.utils.fromWei(await (new web3Client.client.eth.Contract(JSON.parse(contract.ABI), contract.address)).methods.balanceOf(address).call(), contract.EtherUnits));
        }
    } catch (e) {
        return Promise.reject(e)
    }
}

