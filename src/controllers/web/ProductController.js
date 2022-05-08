import ProductService from '../../service/ProductService.js'
import _ from 'lodash';

class ProductController {

    getAll = async (req, res) => {
        ProductService.getAll().then(products => {
            console.log(_.uniqBy(products, 'category').map((product) => {return product.category}));
            res.render("./products/ProductMain", {productList: products, username: req.session.username, 
                categories: _.uniqBy(products, 'category').map((product) => {return product.category})})
        }).catch(err => {
            if(err.error == 404)
                res.render("./products/ProductMain", {productList: [], username: req.session.username, categories: products.map((product) => {return product.category})})
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }
    getCart = async (req, res) => {
        console.log("hoal")
        ProductService.getAll().then(products => {
            res.render("./cart/CartMain", {productList: products, username: req.session.username})
        }).catch(err => {
            if(err.error == 404)
                res.render("./cart/CartMain", {productList: [], username: req.session.username})
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }
}
export default new ProductController();
