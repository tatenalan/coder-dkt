import MessageService from '../../service/MessageService.js'

class MessageController {

    getAll = async (req, res) => {
        MessageService.getAll().then(messages => {
            res.render('./chat/ChatMain', { messages, username: req.session.username })
        }).catch(err => {
            if(err.error == 404)
                res.render('./chat/ChatMain', { messages: [], username: req.session.username })
            else{
                res.status(err.error)
                res.json(err)
            }
        })
    }

    /* getById = async (req, res) => {
        MessageService.getById(req.params.id).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    save = async (req, res) => {
        MessageService.save(req.body).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    update = (req, res) => {
        MessageService.update(req.body).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteById = (req, res) => {
        MessageService.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    }

    deleteAll = (req, res) => {
        MessageService.deleteAll().then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(err.error)
            res.json(err)
        })
    } */
}
export default new MessageController();
