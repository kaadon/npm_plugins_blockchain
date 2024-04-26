const { scanBlock,web3Client } = require("../blockchain");
const web3 = web3Client.infuraIoClient('77e71e4583ec473f8f8c2afd3feea9c9', 'sepolia').client
scanBlock(web3,5780090).then(res=>{console.log(res.length)})

