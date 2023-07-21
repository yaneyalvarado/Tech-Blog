const Login = document.getElementById("login");
const Email = document.getElementById("email");
const Password = document.getElementById("password");
console.log("login", Login);

Login.addEventListener("submit", async function (event) {
  event.preventDefault();
  const response = await fetch("/users/login", {
    method: "post",
    body: JSON.stringify({
      email: Email.value,
      password: Password.value,
    }),
    headers: {"Content-Type": "application/json"}
  });
  const data = await response.json()
  if (data.user) {
    location.href="/dashboard"
  }
});
