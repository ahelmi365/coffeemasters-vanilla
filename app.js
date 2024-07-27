import { loadData } from "./services/Menu.js";
import Store from "./services/Store.js";

window.app = {};
app.store = Store;

document.addEventListener("DOMContentLoaded", async (event) => {
  console.log("DOM-Content Loaded!");
  await loadData();
  console.log(app.store.menue);
});
