/*var user = initApp(),
    hostname = window.location.hostname,
    protocol = 'http://',    //window.protocol+'//'
    port = ':8545';



if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(protocol+hostname+port));
}

var ContractAPIjson = [
	{
		"constant": true,
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_date",
				"type": "string"
			},
			{
				"name": "_location",
				"type": "string"
			}
		],
		"name": "pushData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
window.a = ContractAPIjson;

web3.eth.defaultAccount = user.key;

if (web3.personal.unlockAccount(user.key, user.password)) {
   $('#conection').attr('data-feather','eye');
   feather.replace();
}
else{
	 $('#conection').attr('data-feather','eye-off');
   feather.replace();
}

function getContractAPI(address){
	ContractAPI.at(address);
}

*/
