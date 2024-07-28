const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const route = event.currentTarget.getAttribute("href");
        Router.go(route);
      });
    });

    // Event handler for URL change
    window.addEventListener("popstate", (event) => {
      console.log(event.state);
      Router.go(event.state.route, false);
    });

    // check the inital url
    Router.go(location.pathname);
  },

  go: (route, addTowHistory = true) => {
    console.log(`Going to ${route}`);
    if (addTowHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    let pageTemplate = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;

      case "/order":
        pageElement = document.createElement("order-page");

        break;

      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const productId = route.split("-")[1];
          pageElement.dataset.id = productId;
        }
        break;
    }

    if (pageElement) {
      const mainElement = document.querySelector("main");

      mainElement.innerHTML = "";
      mainElement.append(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
