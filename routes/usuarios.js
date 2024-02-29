const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, usuarioPorIdExiste } = require('../helpers/db-validators');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch, 
    usuariosDelete 
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( usuarioPorIdExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // La validacion sobre la tabla de BD
    check('rol').custom( esRolValido ), // No hace falta pasar la prop rol, ya que es el valor del callback. Como coincide en posicion, se puede mandar asi
    validarCampos

], usuariosPost)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( usuarioPorIdExiste ),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router