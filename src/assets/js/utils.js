const CryptoJS = require('crypto-js');  //引用AES源码js
    
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量


const utils = {
  //验证手机号码
  checkPhoneNumber (phone) {
    if(!phone) return false;
    let reg = /^1[2,3,4,5,6,7,8,9]\d{9}$/g;
    return reg.test(phone);
  },
  //加密方法
  encrypt(content) {
    let srcs = CryptoJS.enc.Utf8.parse(content);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  //解密方法
  decrypt (content) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(content);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
};
export default utils