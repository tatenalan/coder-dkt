import CartService from '../../service/CartService.js'
import { sendEmail, sendWpp, orderEmail } from '../../../options/Sender.js'

class ProductController {

    getCart = async (req, res) => {
        CartService.getByIdUser(req.session.idUser).then(cart => {
            console.log(cart.products)
            res.render("./cart/CartMain", {productList: cart.products.map((product)=> ({...product, idCart: cart.id})), username: req.session.username, idCart: cart.id})
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
        CartService.addProduct(req.session.idUser, req.body).then((response) => {
            console.log(response)
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
            console.log(response)
            res.render('./messagesScreen/Success', {message: response.response, username: req.session.username})
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', {message: err.error, username: req.session.username})
        })
    }

    removeAll = async (req, res) => {
        let idCart = req.params.id;
        CartService.deleteAllProductsByIdCart(idCart).then((response) => {
            console.log(response)
            res.render('./messagesScreen/Success', {message: response.response, username: req.session.username})
        }).catch(err => {
            console.log(err.error)
            res.render('./messagesScreen/Error', {message: err.error, username: req.session.username})
        })
    }

    sendOrder = async (req, res) => {
        let subject = `Nuevo pedido de ${req.session.name}, email: ${req.session.email}`
        sendEmail(subject, await orderEmail(req.body.products)).then((response) => {
            sendWpp(subject).then((response) => { 
                res.render('./messagesScreen/Success', {message: "Se está procesando su pedido", username: req.session.username})
             }).catch(err => {
                res.status(err.error)
                res.json(err)
            })
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new ProductController();
