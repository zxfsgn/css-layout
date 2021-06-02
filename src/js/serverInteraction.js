
async function GetProducts() {
  const response = await fetch("/test", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (response.ok) {

  }
}

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
})

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
    document.forms["login"].insertAdjacentHTML("afterbegin", "<a href='editing.html' class='editing'>Редактирование</a>")
  }
}

document.forms["login"].addEventListener("submit", e => {
  e.preventDefault();
  const form = document.forms["registration"];
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;
  Login(email, password)
})

