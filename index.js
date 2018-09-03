 console.log('\n');
 
 var bitcore = require('bitcore-lib'); // You need this with a npm install, you will also need bitcore-explorers as you'll see later

 var privateKeyWIF = 'put your pkWIF here';

 var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
 var address = privateKey.toAddress();
 console.log(address);
 console.log(privateKey);

var value = new Buffer('put 24 words with space between them');
var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);
var address2 = new bitcore.PrivateKey(bn, 'livenet').toAddress();
console.log('address2:');
console.log(address2);

var Insight = require('bitcore-explorers').Insight;
var insight = new Insight();

insight.getUnspentUtxos(address, function(err, utxos){
    if (err) {

    } else {
        // Use utxox to create a new transaction
        console.log(utxos);
        var tx = bitcore.Transaction();
        tx.from(utxos);
        tx.to(address2, 138309);
        tx.change(address);
        tx.fee(2000);
        tx.sign(privateKey);
        
        console.log('transaction:');
        console.log(tx.toObject());

        tx.serialize();

        insight.broadcast(tx, function(err, returnedTxId){
            if (err) {
                console.log(err);
            } else {
                console.log('sucessful broadcast: ' + returnedTxId);
            }
        });
    }
});
*/
