
import MessageDao from "../dao/MessageDao.js"
import ExceptionFactory from "../factory/ExceptionFactory.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'

const exceptionFactory = new ExceptionFactory();

class MessageService extends MessageDao {
    constructor() {
        super('message', new mongoose.Schema({
            author: { type: { 
                id: { type: String, required: false },
                firstName: { type: String, required: false },
                lastName: { type: String, required: false },
                age: { type: String, required: false },
                alias: { type: String, required: false },
                avatar: { type: String, required: false },
            }, required: false, default: {}},
            id: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false, default: new Date().toLocaleString()}
        },{ versionKey: false }))
    }

    async getAll() {
        return super.getAll()
            .then((messages) => {
                if (messages.length) { return messages.map(message => renameField(asPOJO(message), '_id', 'id')) }
                else { throw exceptionFactory.throwException(404, "No existen los mensajes", "No existen los mensajes") }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudieron traer los productos", error.message) })
    }

    async save(message) {
        return super.save(message)
            .then((result) => { console.log("Producto Creado"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo crear el producto", error.message) })
    }

}

export default new MessageService