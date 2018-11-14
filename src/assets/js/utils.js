let utils = {
  checkPhoneNumber (phone) {
    if(!phone) return false;
    let reg = /^1[2,3,4,5,6,7,8,9]\d{9}$/g;
    return reg.test(phone);
  }
};
export default utils