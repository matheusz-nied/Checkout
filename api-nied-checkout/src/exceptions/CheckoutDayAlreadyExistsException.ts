class CheckoutDayAlreadyExistsException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CheckouDayAlreadyExistsException";
    }
}

export { CheckoutDayAlreadyExistsException };
