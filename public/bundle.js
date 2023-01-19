var contractABI = [];
var contractAddress = '0x8e5Ad3E62F3A1090D4F8bFC554C7582cD64460f3';
var web3 = new Web3('http://localhost:9545');
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleSmartContract);

web3.eth.getAccounts()
.then(console.log);
