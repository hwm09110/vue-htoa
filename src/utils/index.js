import { encrypt, decrypt } from './crypt'

//验证手机号码
function checkPhoneNumber (phone) {
  if(!phone) return false;
  let reg = /^1[2,3,4,5,6,7,8,9]\d{9}$/g;
  return reg.test(phone);
}




export default {
  encrypt,
  decrypt,
  checkPhoneNumber,
}