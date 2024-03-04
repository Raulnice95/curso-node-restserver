const { response } = require("express")


const adminRole = (req, res = response, next) => {

    // ya tenemos el usuario autenticado con el middleware ejecutado anterior a este
    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }
    const {rol, nombre } = req.usuario 

    if (rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        })
    }

    next()
}

const tieneRol = (...roles) => { // almacena todas las variables en un arreglo, en este caso, de roles
    return (req, res = response, next) => { // para pasar las mismas variables

        if ( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if ( !roles.includes( req.usuario.rol )){
            return res.status(401).json({
                msg: `El servicio requiere de uno de estos roles ${ roles }`
            })
        }


        next()
    }
}


module.exports = {
    adminRole,
    tieneRol
}