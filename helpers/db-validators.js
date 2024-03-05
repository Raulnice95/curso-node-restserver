const { Role, Usuario, Categoria, Producto } = require('../models');

const esRolValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({rol}) // Validar contra la tabla de BD
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD.`)
    }
}

const emailExiste = async( correo ='' ) => {
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya esta registrado`)
    }
} 

const usuarioPorIdExiste = async( id ='' ) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id ${ id } no existe`)
    }
} 

const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`El id ${ id } de la categoria no existe`)
    }
} 

const existeProductoPorId = async( id ) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`El id ${ id } del producto no existe`)
    }
} 

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion)
    if (!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioPorIdExiste,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}