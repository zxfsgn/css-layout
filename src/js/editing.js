async function CreateProduct() {
  const response = await fetch("http://localhost:5000/editing ", {
    method: "POST",
    body: new FormData(userForm)
  })
}

document.forms["userForm"].addEventListener("submit", e => {
  e.preventDefault();
  CreateProduct();
});