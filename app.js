const express = require('express');
const url = require('url');
const Web3 = require('web3');
var path = require('path');
const app = express();
var user = {};
var transactions = [
	{
		id: '1',
		tHash:'0x5b3551f290fe5f31622bc97dd4ba6e1dbc3233900fca9eb7ef716ff7b9f02d8f',
		date: '16.06.20180',
    location: '59.939095 30.315868',
    status: 'Обработан',
    class: 'alert alert-success',
    url: ''
	},
	{
		id: '2',
		tHash:'0x5b3551f290fe5f31622bc97dd4ba6e1dbc3233900fca9eb7ef716ff7b9f02d8f',
		date: '16.08.20180',
    location: '59.93095 30.315868',
    status: 'Обработан',
    class: 'alert alert-success',
    url: ''
	}
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.get('/auth', function(req, res) {
    user = url.parse(req.url, true).query;
    try {
        web3.personal.unlockAccount(user.key, user.password);
        user.conection = 'eye';
        console.log(user);
        res.status(200).render('main', { res: { user: user, transactions: transactions } });

        web3.eth.getAccounts(function(e){console.log(e)});

    } catch (e) {
        user.key = 'offline';
        user.conection = 'eye-off';
        res.status(200).render('main', { res: { user: user, transactions: transactions } });
    }

});

app.get('/newcontract', function(req, res) {
    var contract = url.parse(req.url, true).query;
    res.sendStatus(200);
    console.log(contract);
});




app.listen(3000)
