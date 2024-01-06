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
    .then((res) => res.json())
    .then((data) => {
      if (data === null) {
        alert("user does not exist.")
      } else if (data.error) {
        alert(data.error);
      } else {
        alert(`welcome ${data.name}`);
      }
    });
});
