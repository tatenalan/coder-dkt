import ExceptionFactory from "./src/factory/ExceptionFactory.js"
import config from './options/config.js'
import parseArgs from "minimist";

import { productRouter } from "./src/routers/api/ProductRouter.js";
import { messageRouter } from "./src/routers/api/MessageRouter.js";
import { cartRouter } from "./src/routers/api/CartRouter.js";

import { productWebRouter } from "./src/routers/web/ProductWebRouter.js";
import { chatWebRouter } from "./src/routers/web/ChatWebRouter.js";
import { generalWebRouter } from "./src/routers/web/GeneralWebRouter.js";
import { cartWebRouter } from "./src/routers/web/CartWebRouter.js";
import { infoWebRouter } from "./src/routers/web/InfoWebRouter.js";

import express from 'express'
import bodyParser from 'body-parser'
import handlebars from 'express-handlebars'
import session from 'express-session'
import sessionFile from 'session-file-store'
sessionFile(session)

import { createServer } from "http"
import { Server } from "socket.io"
import Socket from "./src/socket/Socket.js";

import mongoose from 'mongoose'
import MongoStore from "connect-mongo"

import expressGraphql from "express-graphql";
import graphql from "graphql";
import ProductController from "./src/controllers/api/ProductController.js";

const schema = graphql.buildSchema(`
type Product {
    id: String,
    timestamp: String,
    name: String,
    description: String,
    sku: String,
    photo: String,
    price: Int,
    stock: Int
}
input ProductInput {
    timestamp: String,
    name: String,
    description: String,
    sku: String,
    photo: String,
    price: Int,
    stock: Int
}
type Query {
    getById(id: String): String,
    getAll(field: String, value: String): [Product],
}
type Mutation {
    post(product: ProductInput): Product,
    update(product: ProductInput): Product,
    deleteById(id: String): Product
}
`);

const exceptionFactory = new ExceptionFactory();
const options = { default: { PORT: 8080 }, alias: { p: "PORT" } }
const args = parseArgs(process.argv.slice(2), options)
const app = express();
const PORT = args.PORT
const httpServer = new createServer(app)
const io = new Server(httpServer)
const socket = new Socket(io)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'));

app.use('/graphql', expressGraphql.graphqlHTTP({
    schema: schema,
    rootValue: ProductController,
    graphiql: true
}))

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options).then(() => {
    console.log("Mongo Atlas Conneted")
}).catch(err => {
    console.log(err)
})

//Posicionarlo arriba de las rutas ya que se lo asigna por orden
app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongodb.cnxStr }),
    secret: 'secreto',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    //cookie: { maxAge: 60000 } // 60 segundos
}))

app.use('/api/products', productRouter);
app.use('/api/messages', messageRouter);
app.use('/api/carts', cartRouter);
app.use('/products', productWebRouter);
app.use('/chat', chatWebRouter);
app.use('/cart', cartWebRouter);
app.use('/info', infoWebRouter);
app.use('/', generalWebRouter);

const server = httpServer.listen(PORT, async () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
});

server.on('error', function (e) {
    console.log('Error al conectar con el servidor');
    console.log(e);
});

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', './public')
app.set('view engine', 'handlebars')

io.on('connection', socket.connection)

app.use((req, res) => {
    res.status(404);
    res.json(exceptionFactory.throwException(-2, `Ruta ${req.originalUrl} método ${req.method} no implementada.`))
})

