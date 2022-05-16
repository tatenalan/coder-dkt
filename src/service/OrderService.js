
import ExceptionFactory from "../factory/ExceptionFactory.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'
import Order from "../models/Order.js"
import OrderDao from "../dao/OrderDao.js"

const exceptionFactory = new ExceptionFactory();

let counter = 1;
var ItemSchema = new mongoose.Schema({
    order_number: { type: Number, required: false, default: () => counter++ },
    items: { type: [], required: false },
    create_at: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: false },
},{ versionKey: null })
  
class OrderService extends OrderDao {

    constructor() {
        super('order', ItemSchema)
    }


    async getAll() {
        return super.getAll()
            .then((products) => {
                if (products.length) { return products.map(product => renameField(asPOJO(product), '_id', 'id')) }
                else { throw exceptionFactory.throwException(404, "No existen ordenes", "No existen ordenes") }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudieron traer las ordenes", error.message) })
    }

    async save(product, email, order_number) {
        return super.save(new Order(product, email, order_number))
            .then((result) => { console.log("Orden Creada"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo crear la orden", error.message) })
    }

}

export default new OrderService