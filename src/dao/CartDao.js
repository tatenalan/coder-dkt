import mongoose from 'mongoose'

class CartDao {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema, nombreColeccion)
    }

    getById(id) {
        return this.coleccion.find({ '_id': id })
    }

    getByIdUser(idUser) {
        return this.coleccion.find({ 'idUser': idUser })
    }

    getAll() {
        return this.coleccion.find({}).lean()
    }

    save(cart) {
        return this.coleccion.create(cart)
    }

    update(cart) {
        return this.coleccion.replaceOne({ '_id': cart.id }, cart)
    }

    deleteById(id) {
        return this.coleccion.deleteOne({ '_id': id })
    }

    deleteAll() {
        return this.coleccion.deleteMany({})
    }
}
export default CartDao