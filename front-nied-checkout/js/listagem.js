function listAllOfMonth() {
    const containerListagem = document.getElementById("#container-listagem");
    containerListagem.insertAdjacentHTML(
        "beforeend",
        `    
        <div class="nied-spinner">
        <span class="uk-margin-small-right" uk-spinner="ratio: 3"></span>
        
        </div>        `
    );
    const results = fetch(
        "http://127.0.0.1:3000/api/checkoutDay/listAll"
    )
        .then((response) => response.json())
        .then((response) => {
            const containerListagem = document.getElementById(
                "#container-listagem"
            );

            containerListagem.innerHTML = "";
            response.sort((checkout, otherCheckout) => {
                return checkout.day < otherCheckout.day
                    ? 1
                    : checkout.day > otherCheckout.day
                    ? -1
                    : 0;
            });

            if (response.length > 0) {
                let sale_of_month = 0;

                response.forEach((checkout) => {
                    sale_of_month += checkout.sale_day;
                });

                let sale_of_month_field =
                    document.getElementById("#sale-of-month");
                sale_of_month_field.innerHTML = Number(sale_of_month);
            }

            response.map((data) => {
                let date = new Date(data.day);
                let dayFormated =
                    addZero(date.getDate().toString()) +
                    "/" +
                    addZero(date.getMonth() + 1).toString() +
                    "/" +
                    date.getFullYear();

                containerListagem.insertAdjacentHTML(
                    "beforeend",
                    `
                    <a onClick="saveDataSessionStorage(this)" href="/edit.html">
                    <div class="nied-card">
                        <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light nied-card-body">
                            <h3>${dayFormated}</h3>                         
                            
                            <p >Venda do dia: <span>R$ ${data.sale_day}</span></p>

                            <input type="hidden" id=#${data.id} value=${data.id} />
                           


                        </div>
                    </div>
                    </a>`
                );
            });
        });
}

function addZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
}

function saveDataSessionStorage(element) {
    let id = JSON.stringify(element.querySelector("input").value);
    window.sessionStorage.setItem("id", id);
}

listAllOfMonth();
