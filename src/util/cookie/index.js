import {gbs} from '../settings';
import Cookies from 'js-cookie';

class PcCookie {
  constructor() {
    this.pcPrefix = gbs.cookie_prefix;
    this.secretKey = gbs.secret_key;
    this.domain = gbs.domain;
    this.expireTime = 30;
  }

  set(cookieParam) {
    let {key, value, expires, path, success} = cookieParam;
    PcCookie.checkKey(key);
    key = this.pcPrefix + key;
    Cookies.set(key, value, {expires: expires || this.expireTime, path: path || '/', domain: this.domain});
    success && success();
  }

  get(key) {
    PcCookie.checkKey(key);
    return Cookies.get(this.pcPrefix + key);
  }

  delete(cookieParam) {
    let {key, path, success} = cookieParam;
    PcCookie.checkKey(key);
    Cookies.remove(this.pcPrefix + key, {path: path || '/', domain: this.domain});
    success && success();
  }

  geteAll() {
    Cookies.get();
  }

  static checkKey(key) {
    if (!key) {
      throw new Error('没有找到key。');
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。');
    }
  }
}

export default new PcCookie();
