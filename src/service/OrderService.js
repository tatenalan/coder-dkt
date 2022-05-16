
import ExceptionFactory from "../factory/ExceptionFactory.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'
import Order from "../models/Order.js"
import OrderDao from "../dao/OrderDao.js"

const exceptionFactory = new ExceptionFactory();

class OrderService extends OrderDao {

    constructor() {
        super('order', new mongoose.Schema({
            order_number: { type: Number, required: false },
            items: { type: [], required: false },
            create_at: { type: String, required: true },
            state: { type: String, required: true },
            email: { type: String, required: false },
        },{ versionKey: null }))
    }

    async getAll() {
        return super.getAll()
            .then((products) => {
                if (products.length) { return products.map(product => renameField(asPOJO(product), '_id', 'id')) }
                else { throw exceptionFactory.throwException(404, "No existen productos", "No existen productos") }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudieron traer los productos", error.message) })
    }

    async save(product, email) {
        return super.save(new Order(product, email))
            .then((result) => { console.log("Orden Creada"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo crear el producto", error.message) })
    }

}

export default new OrderService