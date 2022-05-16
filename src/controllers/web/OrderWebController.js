import OrderService from '../../service/OrderService.js'

class OrderController {

    getAll = async (req, res) => {
        OrderService.getAll().then(response => {
            res.render("./orders/orders", {orders: response, username: req.session.username})
        }).catch(err => {
            if(err.error == 404)
            res.render("./orders/orders", {orders: [], username: req.session.username})
        else{
            res.render('./messagesScreen/Error', { message: err.description, username: req.session.username })
        }
        })
    }

    getCart = async (req, res) => {
        CartService.getByIdUser(req.session.idUser).then(cart => {
            console.log(cart.products)
            res.render("./cart/CartMain", {productList: cart.products.map((product)=> ({...product, idCart: cart.id})), username: req.session.username, address: req.session.address, idCart: cart.id})
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
export default new OrderController();
