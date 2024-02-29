const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next) =>  {
    const errors = validationResult(req)
    if ( !errors.isEmpty()){
        return res.status(400).json(errors)
    } 

    // El next es para que siga con el siguiente middleware si va todo bien. Es un nombre generico que se le pone para que continue
    next();
}

module.exports = {
    validarCampos
}