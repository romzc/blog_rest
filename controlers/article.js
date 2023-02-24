const validator = require('validator')

const test = (req, res) => {
    return res.status(200).json({
        mensage: "Soy una accion dt test"
    })
}

const curso = (req, res) => {
    return res.status(200).json({hello:" adasd "})
}


// Metodo que permite cear y almacenar un articulo 
// escrito por nuestros usuarios.
const create = (req, res) => {

    // Recoger los datos
    const params = req.body;
    // Validar los datos
    try {

        let validar_titulo = !validator.isEmpty(params.titulo) &&
                            validator.isLength(params.titulo,{min:8,max:35})

        let validar_contenido =  !validator.isEmpty(params.contenido)

        if( !validar_contenido || !validar_titulo ) {
            throw new Error("No se valido la informacion")
        }

    } catch ( error ) {
        return res.status(400).json({
            status: "error",
            mesage: `Faltan datos para enviar ${error.message}`
        })
    }
    // Crear el objeto basado en el modelo y asignar valores.

    // la asignacion se puede hacer manualmete o automaticamente

    // Guadar el articulo en la base de datos.

    // Devolver un mensage de la accion realizada.

    return res.status(200).json({
        message: "save action",
        params
    })
}

module.exports = {test, curso, create}