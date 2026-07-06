console.log(process.env.CRYPTO_KEY);
const CryptoJS = require("crypto-js");
const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.lib.WordArray.random(16);

const encryptData = (data) => {
    try{
    return CryptoJS.AES.encrypt(data, key, {
        iv: iv,
    }).toString();
    }catch(error){
        console.error("Encryption Failed");
        console.error(error);
        throw error;
    }
};

const decryptData = (encryptedData) => {
    return CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
    }).toString(CryptoJS.enc.Utf8);
};

module.exports = {
    encryptField: (value) => {
        return encryptData(value)
    },
    decryptField: (value) => decryptData(value),
    encryptData,
    decryptData,
}