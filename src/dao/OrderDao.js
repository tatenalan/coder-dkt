import mongoose from 'mongoose'

class OrderDao {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema, nombreColeccion)
    }
    getAll() {
        return this.coleccion.find({}).lean()
    }
    
    save(order) {
        return this.coleccion.create(order)
    }
}
export default OrderDao