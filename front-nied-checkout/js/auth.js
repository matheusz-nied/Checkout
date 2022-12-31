window.onload = () => {
    let isAuth = JSON.parse(window.localStorage.getItem("auth"));
    if(Boolean(isAuth)) {
        window.location.href = "/";
    }
};
let isAuth = JSON.parse(window.sessionStorage.getItem("auth"));

const formLogin = document.getElementById("#login");

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("#username").value;
    const password = document.getElementById("#password").value;

    const data = {
        username,
        password,
    };
    fetch(`http://127.0.0.1:3000/api/auth`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((response) => {
            window.localStorage.setItem("auth", true);
            window.location.href = "/";
        }).reject(()=>{
            alert("Usuário ou senha inválidos!");

        })
        .catch((err) => {
        });
});




