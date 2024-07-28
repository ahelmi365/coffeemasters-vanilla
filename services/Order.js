import { getProductById } from "./Menu.js";
export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter(
    (productInCard) => productInCard.product.id == id
  );

  if (results.length == 1) {
    app.store.cart = app.store.cart.map((p) => {
      if (p.product.id === id) {
        return { ...p, quantity: p.quantity + 1 };
      } else {
        return p;
      }
    });
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  console.log({ id });
  console.log(app.store.cart);
  app.store.cart = app.store.cart.filter((p) => p.product.id != id);
  console.log(app.store.cart);
}
