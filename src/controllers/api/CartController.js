import CartService from '../../service/CartService.js'

//const CartService = new CartService();

class CartController {

    getAll = async (req, res) => {
        CartService.getAll().then(carts => {
            res.json(carts)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getById  = async (req, res) => {
        CartService.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })      
    }

    save = async (req, res) => {
        CartService.save().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getProductsByIdCarrito = async (req, res) => {
        CartService.getProductsByIdCart(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    addProduct = async (req, res) => {
        CartService.addProduct(req.params.id, req.body.product).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteProductFromCart = async (req, res) => {
        CartService.deleteProductFromCart(req.params.id, req.params.id_prod).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAllProductsByIdCart = async (req, res) => {
        CartService.deleteAllProductsByIdCart(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = async (req, res) => {
        CartService.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = async (req, res) => {
        CartService.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new CartController();
