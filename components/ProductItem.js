import { addToCart } from "../services/Order.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
    // this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const clonedTemplate = template.content.cloneNode(true);

    this.appendChild(clonedTemplate);
    this.appendChild(clonedTemplate);

    const product = JSON.parse(this.dataset.product);
    this.id = product.id;
    // title
    const productTitle = this.querySelector("h4.title");
    productTitle.textContent = product.name;
    // // description
    // const productDescription = this.querySelector("p.description");
    // productDescription.textContent = product.description;
    // price
    const productPrice = this.querySelector("p.price");
    productPrice.textContent = product.price;
    // image
    const productImage = this.querySelector("img.product-img");
    productImage.src = `../data/images/${product.image}`;

    this.querySelector("a").addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        console.log("Add this item");
        addToCart(product.id);
      } else {
        app.router.go(`/product-${product.id}`);
      }
      event.preventDefault();
    });
  }
}

customElements.define("product-item", ProductItem);

// {
//   "id": 42,
//   "name": "Chocolate Chip Muffin",
//   "price": 1.75,
//   "description": "The muffins are incredibly rich, mega chocolate-y, and loaded with chocolate chips in every single bite",
//   "image": "muffin.png"
// }
