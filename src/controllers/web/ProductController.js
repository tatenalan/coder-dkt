import ProductService from '../../service/ProductService.js'
import _ from 'lodash';

class ProductController {

    getAll = async (req, res) => {
        ProductService.getAll().then(products => {
            res.render("./products/ProductMain", {
                productList: products, username: req.session.username,
                categories: _.uniqBy(products, 'category').map((product) => { return product.category })
            })
        }).catch(err => {
            if (err.error == 404)
                res.render("./products/ProductMain", { productList: [], username: req.session.username, categories: products.map((product) => { return product.category }) })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    getByCategory = async (req, res) => {
        ProductService.getAll().then(products => {
            console.log(products.filter((product) => _.isEqual(product.category, req.params.category)));
            res.render("./categories/CategoriesMain", { productList: products.filter((product) => _.isEqual(product.category, req.params.category)), username: req.session.username })
        }).catch(err => {
            if (err.error == 404)
                res.render("./categories/CategoriesMain", { productList: products.filter((product) => _.isEqual(product.category, req.params.category)), username: req.session.username })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    getCart = async (req, res) => {
        ProductService.getAll().then(products => {
            res.render("./cart/CartMain", { productList: products, username: req.session.username })
        }).catch(err => {
            if (err.error == 404)
                res.render("./cart/CartMain", { productList: [], username: req.session.username })
            else {
                res.status(err.error)
                res.json(err)
            }
        })
    }

    deleteById = (req, res) => {
        console.log(req.params.id);
        ProductService.deleteById(req.params.id).then((response) => {
            console.log(response)
            res.render('./messagesScreen/Success', { message: response.response, idUser: req.session.idUser })
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', { message: err.error, idUser: req.session.idUser })
        })
    }

    getUpdate = async (req, res) => {
        console.log(req.params)
        console.log(req.params.id)
        ProductService.getById(req.params.id).then(product => {
            console.log(product)
            res.render('./products/ProductUpdate', { product: product, idUser: req.session.idUser })
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new ProductController();
