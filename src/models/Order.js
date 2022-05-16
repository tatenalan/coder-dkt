class Order {
    constructor(products, email) {
        this.order_number = "";
        this.items = products;
        this.create_at = new Date().toLocaleTimeString();
        this.state = "generada",
        this.email = email
    }
}

export default Order;
