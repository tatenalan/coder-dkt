class ProductDto {
    constructor(product) {
        this.timestamp = product.timestamp;
        this.name = product.name ? product.name : "";
        this.description = product.description ? product.description : "",
        this.sku = product.sku ? product.sku : "",
        this.photo = product.photo ? product.photo : "",
        this.price = product.price ? product.price : 0,
        this.stock = product.stock ? product.stock : 0;
    }
}

export default ProductDto