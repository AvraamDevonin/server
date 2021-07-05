const CryptoAES = require("crypto-js/aes");
const decrypt = require('./decrypt');

function encrypt(string = "test", code = "arbitrage") {
  const data = CryptoAES.encrypt(string, code);
  console.log("---> encrypt (test) = ", data);
  decrypt(data, code);
  return data;
}


module.exports = encrypt;