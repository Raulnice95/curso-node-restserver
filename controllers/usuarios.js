const { requst, response } = require('express')

// Traemos el modulo response para tener el autocompletado en VSC
const usuariosGet = (req= requst, res = response) => {
    // Por ejemplo, para la peticion: http://localhost:8080/api/usuarios?q=hola&nombre=Raul&apikey=123451234
    const {q, nombre, apikey} = req.query; // Para extraer los query params, express nos facilita todos los parametros de segmento como query params
    res.json({
        msg: 'get API - controlador',
        q, 
        nombre, 
        apikey
    })
    // Si no viene definido algun param en la req, no la devuelve. Tambien le podemos poner un por defecto, si no viene
}
const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body
    })
}
const usuariosPut = (req, res = response) => {
    // Por ejemplo: http://localhost:8080/api/usuarios/10
    const id = req.params.id // De esta manera podemos desestructurar parametros de segmento (que viene implicito en la url de la request)

    res.json({
        msg: 'put API - controlador',
        id
    })
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    })
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}