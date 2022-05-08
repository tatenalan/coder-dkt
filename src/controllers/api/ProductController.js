import ProductService from '../../service/ProductService.js'

class ProductController {

    getAll = async (req, res) => {
        ProductService.getAll().then(products => {
            console.log(products)
            return products;
            //res.json(products)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getById = async (req, res) => {
        console.log(req);
        ProductService.getById(req.id).then(product => {
            console.log(product)
            return product
            //res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    getByCategory = async (req, res) => {
        console.log(req);
        ProductService.getById(req.id).then(product => {
            console.log(product)
            return product
            //res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    post = async (req, res) => {
        ProductService.save(req.body).then(response => {
            return response
            // res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    update = (req, res) => {
        ProductService.update(req.body).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = (req, res) => {
        ProductService.deleteById(req.params.id).then((response) => {
            return response
            // res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = (req, res) => {
        ProductService.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }
}
export default new ProductController();
