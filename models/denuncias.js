const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/ProyectoIngSoftware';

mongoose.connect(DB_URL, {})
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));


let denunciaSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now, required: true },
    descripcion: { type: String, required: true },
    archivo: {
        filename: String, 
        contentType: String 
    }
}, { versionKey: false });

const denuncia = mongoose.model('denuncias', denunciaSchema); 

module.exports = denuncia;