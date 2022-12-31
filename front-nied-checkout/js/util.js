function addNewPayment() {
    const containerPayments = document.getElementById("#container-payments");

    containerPayments.insertAdjacentHTML(
        "beforeend",
        `<div class="div-payments">
        <label>Referente:</label>
        <input class="uk-input" id="#reference_to" type="text" placeholder="Nome empresa" name="reference_to">

        <label>Valor pago:</label>
        <input class="uk-input" id="#value" type="number" step="0.01" placeholder="0,00" name="value"/>
        <hr />

    </div>`
    );
}

