export class OrderPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    email: "",
  };
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    const loadStyle = async () => {
      const request = await fetch("./components/OrderPage.css");
      const css = await request.text();
      styles.textContent = css;
    };
    loadStyle();
  }

  connectedCallback() {
    window.addEventListener("appcartchange", (event) => {
      this.render();
    });

    this.render();
  }

  render() {
    const allProductsInCart = app.store.cart;
    const section = this.root.querySelector("section");
    if (app.store.cart.length === 0) {
      section.innerHTML = `
      <p class="empty"> Your order is empty</p>
      `;
    } else {
      const html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const templatePage = document.getElementById("order-form-template");
      const clonedTemplate = templatePage.content.cloneNode(true);
      section.appendChild(clonedTemplate);
      let total = 0;

      for (const productInCart of allProductsInCart) {
        const cartItem = document.createElement("cart-item");
        cartItem.dataset.item = JSON.stringify(productInCart);
        this.root.querySelector("ul").appendChild(cartItem);
        total += productInCart.quantity * productInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
      <li>
          <p class='total'>Total</p>
          <p class='price-total'>$${total.toFixed(2)}</p>
      </li>                
  `;
    }
  }
}

customElements.define("order-page", OrderPage);
