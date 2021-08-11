const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
    }
});

module.exports = mongoose.model('productos', productoSchema)