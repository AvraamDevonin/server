const CryptoAES = require("crypto-js/aes");
const CryptoENC =  require('crypto-js/enc-utf8');

function decrypt(string = "test", code = "arbitrage") {
  
  let data = CryptoAES.decrypt(string, code);
  data = data.toString(CryptoENC);
  console.log("decrypt (test) = ", data);
  return data;
}

module.exports = decrypt;


 