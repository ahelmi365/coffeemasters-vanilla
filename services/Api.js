const API = {
  url: "../data/menu.json",
  fetchMenu: async () => {
    try {
      const res = await fetch(this.url);
      return await res.json();
    } catch (error) {
      console.log({ error });
    }
  },
};

export default API;
