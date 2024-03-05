const { response } = require('express');
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const subirArchivo = ( files, extensionesPermitidas = ['jpg','png','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]
    
        // Validar la extension
        if ( !extensionesPermitidas.includes( extension ) ){
            return reject(`La extension ${ extension } no es permitida. Las permitidas son ${ extensionesPermitidas }.`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension; // Para evitar duplicados de nombres en la carpeta de subidas
    
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);
    
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err){
                reject(err);
            }
    
            resolve( nombreTemp );
        });
    })

}

module.exports = {
    subirArchivo
}