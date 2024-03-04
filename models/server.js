const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
        }

        // Conectar a la base de datos
        this.conectarDb()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDb () {
        await dbConnection();
    }

    middlewares() {

        // CORS. Para proteger los origenes de las peticiones a backend
        this.app.use( cors() )

        // lectura y parse del body. Para serializar la info en peticiones POST, PUT y DELETE
        this.app.use( express.json())

        // Directrio publico
        this.app.use( express.static('public') )

    }

    routes() {   

        // Separar las rutas en fichero independiente y fijando la ruta de peticion api/usuarios
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }

}

module.exports = Server;