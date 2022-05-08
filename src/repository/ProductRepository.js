
import ProductDao from "../dao/ProductDao.js"
import ExceptionFactory from "../factory/ExceptionFactory.js"
import { asPOJO, renameField } from '../utils/ObjectUtils.js'
import mongoose from 'mongoose'
import Product from "../models/Product.js"

const exceptionFactory = new ExceptionFactory();

class ProductService extends ProductDao {

    constructor() {
    }

    async getById(id) {
        return super.getById(id) 
            .then((product) => {
                if (product.length) { return renameField(asPOJO(product[0]), '_id', 'id') }
                else { throw exceptionFactory.throwException(404, "No existe el producto con id: " + id, "No existe el producto con id: " + id) }
            })
            .catch((error) => { console.log(error); throw error.error ? error : exceptionFactory.throwException(error.error, "No se pudo traer el producto con id: " + id, error.message) })
    }

    async getAll() {
        return super.getAll()
            .then((products) => {
                if (products.length) { return products.map(product => renameField(asPOJO(product), '_id', 'id')) }
                else { throw exceptionFactory.throwException(404, "No existen productos", "No existen productos") }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudieron traer los productos", error.message) })
    }

    async save(product) {
        return super.save(new Product(product))
            .then((result) => { console.log("Producto Creado"); return renameField(asPOJO(result), '_id', 'id') })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo crear el producto", error.message) })
    }

    async update(product) {
        return super.update(new Product(product))
            .then(() => { console.log(`Producto con id ${product.id} actualizado`); return { response: `Producto con id ${product.id} actualizado`, product: product } })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo actualizar el producto", error.message) })
    }

    async deleteById(id) {
        return super.deleteById(id)
            .then((response) => {
                if (response.deletedCount) { return (console.log(`Producto con id ${id} eliminado`), { response: `Producto con id ${id} eliminado` }) }
                else { throw exceptionFactory.throwException(404, `No existe producto con id: ${id}`, `No existe producto con id: ${id}`) }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudo eliminar el producto con id: " + id, error.message) })
    }

    async deleteAll() {
        return super.deleteAll()
            .then((response) => {
                if (response.deletedCount) { return (console.log("Todos los productos fueron eliminados"), { response: "Todos los productos fueron eliminados" }) }
                else { throw exceptionFactory.throwException(404, "No existen productos", "No existen productos") }
            })
            .catch((error) => { console.log(error); throw exceptionFactory.throwException(error.error, "No se pudieron eliminar los productos", error.message) })
    }
}

export default new ProductService