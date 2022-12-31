function fillInData() {
    let id = JSON.parse(window.sessionStorage.getItem("id"));

    fetch(`http://127.0.0.1:3000/api/checkoutDay/findOneByID/${id}`)
        .then((response) => response.json())
        .then((response) => {
            let day_field = document.getElementById("#day");
            let id_field = document.getElementById("#id");

            let tittle_day_field = document.querySelector(".nied-title-edit");

            let cash_in_hand_money_field = document.getElementById(
                "#cash_in_hand_money"
            );

            let cash_in_hand_card_field =
                document.getElementById("#cash_in_hand_card");

            let date = new Date(response.day);
            let dayFormated =
                addZero(date.getDate().toString()) +
                "/" +
                addZero(date.getMonth() + 1).toString() +
                "/" +
                date.getFullYear();

            let dayFormatedInput =
                date.getFullYear() +
                "-" +
                addZero(date.getMonth() + 1).toString() +
                "-" +
                addZero(date.getDate().toString());

            id_field.value = response.id;
            tittle_day_field.innerHTML = dayFormated;
            day_field.value = dayFormatedInput;
            cash_in_hand_money_field.value = response.cash_in_hand_money;
            cash_in_hand_card_field.value = response.cash_in_hand_card;
            addNewPaymentExistent(response.payments);
        });
}
function addZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
}

function addNewPaymentExistent(payments) {
    const containerPayments = document.getElementById("#container-payments");

    payments.map((payment) => {
        containerPayments.insertAdjacentHTML(
            "beforeend",
            `<div class="div-payments">
            <label>Referente:</label>
            <input class="uk-input" id="#reference_to" type="text" placeholder="Nome empresa" name="reference_to" value=${
                payment.reference_to
            }>
    
            <label>Valor pago:</label>
            <input class="uk-input" id="#value" type="number" step="0.01" placeholder="0,00" name="value" value=${Number(
                payment.value
            )} />
            <hr />
    
        </div>`
        );
    });
}

const form = document.getElementById("#form-editCheckout");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let id_field = document.getElementById("#id");
    let day_field = document.getElementById("#day");
    let cash_in_hand_money_field = document.getElementById(
        "#cash_in_hand_money"
    );
    let cash_in_hand_card_field = document.getElementById("#cash_in_hand_card");

    let day = new Date(day_field.value);
    day.setUTCHours(3);
    day = day.toISOString();
    let cash_in_hand_card = Number(cash_in_hand_card_field.value);
    let cash_in_hand_money = Number(cash_in_hand_money_field.value);

    let payments = [];

    let container_payments = document.getElementById("#container-payments");

    for (let i = 0; i < container_payments.children.length; i++) {
        let reference_to =
            container_payments.children[i].querySelector(
                'input[type="text"]'
            ).value;
        let value = Number(
            container_payments.children[i].querySelector('input[type="number"]')
                .value
        );
        payments.push({ reference_to, value });
    }

    const data = {
        day,
        cash_in_hand_money,
        cash_in_hand_card,
        payments,
    };
    fetch(`http://127.0.0.1:3000/api/checkoutDay/${id_field.value}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then(() => {
            window.location.href = "/";
        })
        .catch((err) => console.log(err));
});

function deletePayment() {
    let id = document.getElementById("#id").value;

    fetch(`http://127.0.0.1:3000/api/checkoutDay/${id}`, {
        method: "delete",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then(() => {
            window.location.href = "/";
        })
        .catch((err) => console.log(err));
}

fillInData();
