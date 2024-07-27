import API from "./services/API.js";

export async function loadData() {
  app.store.menue = await API.fetchMenu();
}
