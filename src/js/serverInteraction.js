async function CreateUser(email, password) {
  await fetch("http://localhost:5000/api/auth/register/", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  })
}

document.forms["registration"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["registration"];
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  CreateUser(email, password)
  document.querySelector('.reg').classList.remove('open')
  document.querySelector('.auth').classList.add('open')
  localStorage.removeItem('password')
  localStorage.removeItem('email')
  logForm.elements["email"].value = email
  logForm.elements["password"].value = password
  logForm.elements['agreement'].checked = false
})

let exit = document.querySelector('.middle-header__exit')
exit.onclick = () => {
  localStorage.removeItem('user')
}

let AdminConfirmed = () => {
  document.querySelector(".middle-header__exit").insertAdjacentHTML("beforebegin", "<a href='editing.html' class='editing'>Редактирование </a>")
  document.forms["registration"].setAttribute('hidden', true)
  document.forms["login"].setAttribute('hidden', true)
  document.querySelector('.middle-header__registr').setAttribute('hidden', true)
  document.querySelector('.middle-header__login').setAttribute('hidden', true)
  exit.style.display = "inline"
}

async function Login(email, password) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    })
  })
  if (response.ok) {
    AdminConfirmed()
    localStorage.setItem('user', 'admin')
  }
}

document.forms["login"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["login"];
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  Login(email, password)
  if (form.elements["agreement"].checked) {
    localStorage.setItem('password', password)
    localStorage.setItem('email', email)
  } else {
    localStorage.removeItem('password')
    localStorage.removeItem('email')
  }
  //if email is contained in localStorage then make autocomplete password
})

let logForm = document.forms["login"]

if (localStorage.getItem('password')) {
  logForm.elements["email"].value = localStorage.getItem('email')
  logForm.elements["password"].value = localStorage.getItem('password')
  logForm.elements['agreement'].checked = true
}

if (localStorage.getItem('user')) {
  AdminConfirmed()
}

async function GetProducts() {
  const response = await fetch("http://localhost:5000/api/products", {
    method: "GET",
    headers: { "Accept": "application/json" }
  })
  if (response.ok) {
    const products = await response.json()
    products.forEach((item) => {
      let template = document.querySelector('.item-product').cloneNode(true)
      template.querySelector('img').setAttribute('src', `http://localhost:5000/${item.img}`)
      template.querySelector('picture > source').setAttribute('srcset', `http://localhost:5000/${item.img}`)
      template.querySelector('.item-product__price > span').innerHTML = item.price
      template.querySelector('.item-product__header').innerHTML = item.name
      document.querySelector('.slider2__wrapper').prepend(template)
    })
  }
}

GetProducts()