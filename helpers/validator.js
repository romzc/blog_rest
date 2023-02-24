const validator = require('validator')


const dataValidator = (params) => {

    let validar_titulo = !validator.isEmpty(params.titulo) && validator.isLength(params.titulo,{min:8,max:35})

    let validar_contenido =  !validator.isEmpty(params.contenido)

    if( !validar_contenido || !validar_titulo ) {
        throw new Error("No se valido la informacion")
    }
}

module.exports = {
    dataValidator
}