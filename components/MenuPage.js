export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    const loadStyle = async () => {
      const request = await fetch("./components/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    };
    loadStyle();
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const clonedTemplate = template.content.cloneNode(true);
    this.root.appendChild(clonedTemplate);

    window.addEventListener("appmenuchange", (event) => {
      console.log("menu changed");
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `<h3>${category.name}</h3>
            <ul class = "category">
            </ul>`;
        this.root.querySelector("#menu").appendChild(liCategory);

        for (let product of category.products) {
          const productItem = document.createElement("product-item");
          productItem.dataset.product = JSON.stringify(product);
          const liProduct = document.createElement("li");
          liProduct.appendChild(productItem);
          //   console.log(liProduct);
          liCategory.querySelector("ul").appendChild(liProduct);
        }
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
