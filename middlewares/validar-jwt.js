const { response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async(req, res = response, next) => {

    const token = req.header('x-token')
    if (!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        
        const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY ) // Para verificar si el JWT es valido
        const {uid} = payload

        // leer el usuario que corresponde el uid
        const usuario = await Usuario.findById( uid )

        // Si retorna undefined es porque no lo encuentra
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            }) 
        }

        // Verificar si el usuario no ha sido eliminado - estado = true
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado en false'
            })
        }

        req.usuario = usuario // pasamos el usuario con el que se ha autenticado la peticion

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}


module.exports = {
    validarJWT
}