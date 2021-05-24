const { reset } = require("browser-sync");

async function GetProducts() {
  const response = await fetch("/", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (response.ok) {

  }
}

async function CreateProduct(name, price, image) {
  const response = await fetch("/", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      price: parseInt(price, 10),
      image
    })
  })
  if (response.ok === true) {
    const products = await response.json()
    document.querySelectorAll('item-product__header')[0].replaceWith(products[0])
  }
}

document.forms["userForm"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["userForm"];
  const name = form.elements["name"].value;
  const price = form.elements["price"].value;
  const image = form.elements["image"].value;
  CreateProduct(name, price, image);
});

