const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/ProyectoIngSoftware';

mongoose.connect(DB_URL,{})

    .then(()=>console.log('DB conectado'))
    .catch(err=>console.log(err))

//Schema
let userSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    apellidos: {type:String, required:true},
    cedula: {type:String, required:true},
    correo: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    telefono: {type:String, required:true},
    distrito: {type:String, required:true},
    direccion: {type:String, required:true},
    role: { type:String, default: 'user', required:true}
},{versionKey:false});

//Model
let user = new mongoose.model('Users', userSchema);

module.exports = user;