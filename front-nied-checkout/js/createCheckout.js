

const form = document.getElementById("#form-createCheckout");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let day_field = document.getElementById("#day");
    let cash_in_hand_card_field = document.getElementById("#cash_in_hand_card");
    let cash_in_hand_money_field = document.getElementById(
        "#cash_in_hand_money"
    );

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
    fetch("http://127.0.0.1:3000/api/checkoutDay", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then(() => {
            let modal = document.getElementById("modal-sections");
            UIkit.modal(modal).hide();
            listAllOfMonth();
            cleanFieldsCreate(
                day_field,
                cash_in_hand_card_field,
                cash_in_hand_money_field,
                container_payments
            );
        })
        .catch((err) => console.log(err));
});

function cleanFieldsCreate(
    day_field,
    cash_in_hand_card_field,
    cash_in_hand_money_field,
    container_payments
) {
    day_field.value = "";
    cash_in_hand_card_field.value = "";
    cash_in_hand_money_field.value = "";

    for (let i = 0; i < container_payments.children.length; i++) {
        container_payments.children[i].querySelector(
            'input[type="text"]'
        ).value = "";

        container_payments.children[i].querySelector(
            'input[type="number"]'
        ).value = "";
    }
}
