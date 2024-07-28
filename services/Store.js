const Store = {
  menu: null,
  cart: [],
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property === "menu") {
      console.log("menu is chnaged");
      window.dispatchEvent(new Event("appmenuchange"));
    } else if (property === "cart") {
      console.log("Card is changed");
      window.dispatchEvent(new Event("appcartchange"));
    }
    return true;
  },
});
export default proxiedStore;
