import API from "./API.js";

export async function loadData() {
  app.store.menue = await API.fetchMenu();
}
