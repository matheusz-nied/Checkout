window.onload = () => {
   isAuthenticate();
};
function isAuthenticate() {
    let isAuth = JSON.parse(window.localStorage.getItem("auth"));
    if (!Boolean(isAuth)) {
        window.location.href = "/login.html";

    } 
}
