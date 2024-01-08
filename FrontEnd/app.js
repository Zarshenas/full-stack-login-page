const form = document.getElementById("form");

const URL = "http://127.0.0.1:3000/api/v1";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  if (!username || !password) {
    alert("please fill all required fields.");
    return;
  }
  fetch(`${URL}/users?username=${username}&password=${password}`)
    .then((res) => {
      if (res.status === 404) alert(res.statusText);
      if (res.status === 200) return res.json()
    })
    .then((data) => {
      if (data) alert(`Welcome {${data.username}}`)
    });
});
