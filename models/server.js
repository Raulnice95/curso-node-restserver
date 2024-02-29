const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

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
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }

}

module.exports = Server;