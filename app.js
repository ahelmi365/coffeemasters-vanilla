import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

window.app = {};
app.store = Store;
app.router = Router;

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM-Content Loaded!");
  await loadData();
  console.log(app.store.menue);

  app.router.init();
  app.router.go("/");
});
