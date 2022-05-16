import OrderService from '../../service/OrderService.js'

class OrderController {

    post = async (req, res) => {
        OrderService.save(req.body).then(response => {
            return response
            // res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new OrderController();
