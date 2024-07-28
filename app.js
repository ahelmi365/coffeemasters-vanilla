import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";
// Link my Web Components
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { ProductItem } from "./components/ProductItem.js";
import { CartItem } from "./components/CartItem.js";

window.app = {};
app.store = Store;
app.router = Router;

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM-Content Loaded!");
  app.router.init();
  await loadData();

  // app.router.go("/");
});

window.addEventListener("appcartchange", (event) => {
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById("badge");
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
