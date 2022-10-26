import Cookie from "universal-cookie";
const cookie = new Cookie();

class CookieService {
  get(key) {
    return cookie.get(key);
  }
  set(key, value, option) {
    cookie.set(key, value, option);
  }
}

export default new CookieService();
