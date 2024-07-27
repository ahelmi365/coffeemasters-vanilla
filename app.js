import API from "./services/API.js";
import Store from "./services/Store.js";

window.app = {};
app.store = Store;

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM-Content Loaded!");

  app.store.menue = await API.fetchMenu();

  console.log(app.store.menue);
});
