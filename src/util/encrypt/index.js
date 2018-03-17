import CryptoJS from 'crypto-js';
import {gbs} from '../settings';

class PcEncrypt {
  constructor() {
    this.secretKey = gbs.secret_key;
  }

  encrypt(data, key) {
    if (!key) {
      key = this.secretKey;
    }
    let ciphertext = CryptoJS.AES.encrypt(data, key);
    return ciphertext.toString();
  }

  decrypt(data, key) {
    let bytes = '';
    if (!key) {
      key = this.secretKey;
    }
    try {
      bytes = CryptoJS.AES.decrypt(data.toString(), key || this.secretKey);
    } catch (ex) {
      console.info('PcEncrypt.decrypt', ex);
    }
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  aesEncrypt(data, keyStr, ivStr) {
    let sendData = CryptoJS.enc.Utf8.parse(data);
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    let encrypted = CryptoJS.AES.encrypt(sendData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  aesDecrypt(data, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    // 解密的是基于BASE64的数据，此处data是BASE64数据
    let decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Iso10126
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

export default new PcEncrypt();
