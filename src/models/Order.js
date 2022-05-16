class Order {
    constructor(products, email, order_number) {
        this.order_number = order_number ? order_number + 1 : 0;
        this.items = products;
        this.create_at = new Date().toLocaleDateString();
        this.status = "generada",
        this.email = email
    }
}

export default Order;
