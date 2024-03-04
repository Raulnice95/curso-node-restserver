const { response } = require("express");
const { Producto } = require("../models");

// Obtener productos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0 } = req.query
    const query = { estado: true}

    // Para lanzar las dos promesas al mismo tiempo
    const [ total, productos ] = await Promise.all([ 
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
}

// Obtener producto - populate()
const obtenerProducto = async(req, res = response) => {

    const { id } = req.params
    const producto = await Producto.findById( id )
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    
        res.json(producto)

}

const crearProducto = async(req, res = response) => {
    const {estado, usuario, ...body } = req.body;

    const productoDb = await Producto.findOne({ nombre: body.nombre })
    if (productoDb){
        return res.status(400).json({
            msg: `El producto ${productoDb.nombre} ya existe`
        })
    }

    // Generar la data al guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data)

    // Guardar el producto
    await producto.save()

    res.status(201).json(producto)
}

// Actualizar producto
const actualizarProducto = async(req, res = response) => {
    
    const { id } = req.params
    const { estado, usuario, ...data } = req.body // para quitar el estado y usuario de la rq

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id // el ultimo usuario que ha modificado el producto

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json(producto)

}

// Borrar producto - estado: false
const borrarProducto = async(req, res=response) => {

    const { id } = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(productoBorrado)

}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}