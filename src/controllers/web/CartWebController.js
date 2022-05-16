import CartService from '../../service/CartService.js'
import { sendEmail, sendWpp, orderEmail } from '../../../options/Sender.js'
import OrderService from '../../service/OrderService.js'

class CartWebController {

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
    addProduct = async (req, res) => {
        req.body.quantity = (req.body?.quantity) || 1;
        CartService.addProduct(req.session.idUser, req.body).then((response) => {
            res.render('./messagesScreen/Success', {message: response.response, username: req.session.username})
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', {message: err.error, username: req.session.username})
        })
    }

    removeProduct = async (req, res) => {
        let idCart = req.params.id;
        let idProduct = req.body.idProduct;
        CartService.deleteProductFromCart(idCart, idProduct).then((response) => {
            res.render('./messagesScreen/Success', {message: response.response, username: req.session.username})
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', {message: err.error, username: req.session.username})
        })
    }

    removeAll = async (req, res) => {
        let idCart = req.params.id;
        CartService.deleteAllProductsByIdCart(idCart).then((response) => {
            res.render('./messagesScreen/Success', {message: response.response, username: req.session.username})
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', {message: err.error, username: req.session.username})
        })
    }

    sendOrder = async (req, res) => {
        let subject = `Nuevo pedido de ${req.session.name}, email: ${req.session.email}`
        OrderService.getAll().then((orders)=> {
            OrderService.save(req.body.products, req.session.email, orders?.length).then(async () => {
                sendEmail(subject, await orderEmail(req.body.products)).then((response) => {
                    sendWpp(subject).then((response) => { 
                        res.render('./messagesScreen/Success', {message: "Se está procesando su pedido", username: req.session.username})
                     }).catch(err => {
                        res.status(err.error)
                        res.json(err)
                    })
            })
        })
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new CartWebController();
