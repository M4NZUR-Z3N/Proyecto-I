const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/ProyectoIngSoftware';

mongoose.connect(DB_URL,{})

    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.log(err));

    let noticiaSchema = new mongoose.Schema({
        titulo: {type:String, required:true},
        descripcion: {type:String, required:true},
       fecha: {type:Date, default:Date.now, required:true},
       archivo: {
        filename: String, 
        contentType: String
    }
    },{versionKey:false});

const noticia = mongoose.model('noticias', noticiaSchema);
module.exports = noticia;