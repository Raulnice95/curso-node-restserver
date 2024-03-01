const { requst, response } = require('express')
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



// Traemos el modulo response para tener el autocompletado en VSC
const usuariosGet = async(req= requst, res = response) => {
    // Por ejemplo, para la peticion: http://localhost:8080/api/usuarios?q=hola&nombre=Raul&apikey=123451234
    // const {q, nombre, apikey} = req.query; // Para extraer los query params, express nos facilita todos los parametros de segmento como query params

    const {limite = 5, desde = 0 } = req.query
    const query = { estado: true}

    // Para lanzar las dos promesas al mismo tiempo
    const [ total, usuarios ] = await Promise.all([ 
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
    // Si no viene definido algun param en la req, no la devuelve. Tambien le podemos poner un por defecto, si no viene
}


const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync() // Numero de saltos para encriptar. Por defecto, 10
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar en BD
    await usuario.save(); // para grabar en BD

    res.json({
        usuario
    })
}


const usuariosPut = async(req, res = response) => {
    // Por ejemplo: http://localhost:8080/api/usuarios/10
    const id = req.params.id // De esta manera podemos desestructurar parametros de segmento (que viene implicito en la url de la request)
    const { _id, password, google, correo, ...resto} = req.body

    // Validar contra BD
    if ( password ) {
        const salt = bcryptjs.genSaltSync() // Numero de saltos para encriptar. Por defecto, 10
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario)
}


const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    })
}


const usuariosDelete = async(req, res = response) => {

    const { id } = req.params

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id )

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })
    const usuarioAutenticado = req.usuario

    res.json({usuario, usuarioAutenticado})
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}