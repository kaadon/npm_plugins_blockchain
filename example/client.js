const web3Client = require('../blockchain')
const web3 = web3Client.web3Client.bscClient().client
web3.eth.getBlock('latest').then(console.log)