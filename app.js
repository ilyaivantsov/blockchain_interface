const fs = require("fs");
const url = require('url');
const express = require('express');
const Web3 = require('web3');
const solc = require('solc');
const app = express();

var path = require('path'),
    user = {},
    transactionsAddress = [];
    transactions = [
	{
		id: '1',
		tHash:'0x5b3551f290fe5f31622bc97dd4ba6e1dbc3233900fca9eb7ef716ff7b9f02d8f',
		date: '16.06.20180',
    location: '59.939095 30.315868',
    status: 'Обработан',
    class: 'alert alert-success',
    url: ''
	}
];

// Connect to eth net
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
// Solidity compile section 
const input = fs.readFileSync('./contracts/contract.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':gpContr'].bytecode;
const abi = JSON.parse(output.contracts[':gpContr'].interface);

app.use('/static', express.static(__dirname + '/public'));  // For static files
app.set('view engine', 'ejs');    
app.set('views', path.join(__dirname, 'views'));  // Edited views dir 


app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.get('/auth', function(req, res) {
    user = url.parse(req.url, true).query;
    try {
        web3.personal.unlockAccount(user.key, user.password);
        user.conection = 'eye';
        user.net = true;
        user.abi = abi;
        res.status(200).render('main', { res: { user: user, transactions: transactions }});
    } catch (e) {
        user.key = 'Disconnected: ';
        user.conection = 'eye-off';
        user.net = false;
        user.abi = abi;
        res.status(200).render('main', { res: { user: user, transactions: transactions }});
    }
});

app.get('/newcontract', function(req, res) {
    var contract = url.parse(req.url, true).query;
    if (contract.id && contract.date && contract.location){
    	 res.send('OK');
    	 creatNewContract();
    }
    console.log(contract);
});

function creatNewContract() {
    // Contract object
    const contract = web3.eth.contract(abi);

    // Deploy contract instance
    const contractInstance = contract.new({
        data: '0x' + bytecode,
        from: web3.eth.coinbase,
        gas: web3.eth.estimateGas({ data: "0x" + bytecode })
    }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        // Log the tx, you can explore status with eth.getTransaction()
        console.log(res.transactionHash);

        // If we have an address property, the contract was deployed
        if (res.address) {
            console.log('Contract address: ' + res.address);
            // Let's test the deployed contract
            transactionsAddress.push(res.address);
        }
    });
}

app.listen(3000)

