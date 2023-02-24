const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const connection = async () => {
    try {
        /**
         *  los parametros se pasan como objetos // solo en caso de fallos.
         *  useNewparser: true,
         *  useUnifiedTopology: true,
         *  useCreateIndex: true         
         * */
        mongoose.set("strictQuery", false); // evita los warnings de conexion
        await mongoose.connect("mongodb://localhost:27017/mi_blog");

    } catch ( error ) {
        throw new Error("no se puedo conectar a la base de datos")
    }
}

module.exports = {connection}