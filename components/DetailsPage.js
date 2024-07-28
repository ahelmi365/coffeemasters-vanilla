import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    // append html template
    const template = document.getElementById("details-page-template");
    const clonedTemplate = template.content.cloneNode(true);
    this.root.appendChild(clonedTemplate);

    // append css
    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadStyle() {
      const request = await fetch("./components/DetailsPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadStyle();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const id = this.dataset.id;
    if (id) {
      const product = await getProductById(id);

      // title
      this.root.querySelector("h2").textContent = product.name;
      // image
      this.root.querySelector("img").src = `../data/images/${product.image}`;
      // descr
      this.root.querySelector("p.description").textContent =
        product.description;
      // price
      this.root.querySelector("p.price").textContent = product.price;

      // add to cart button
      this.root.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();
        // add to cart
        addToCart(id);
        app.router.go("/order");
      });
    } else {
      alert("Invalid Product ID");
    }
  }
}

customElements.define("details-page", DetailsPage);

// {
//   "product": {
//       "id": 11,
//       "name": "Black Americano",
//       "price": 1.5,
//       "description": "Freshly pulled shots of espresso combined with hot water.",
//       "image": "blackamericano.png"
//   }
// }
