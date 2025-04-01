// Requiring module
const express = require('express');

// Creating express object
const app = express();

const path = require('path');

// Port Number
const PORT = process.env.PORT ||5000;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));// se empieza a buscar en la carpeta public. se sigue un orden en gerarquia, pasando de public a views si no se encuentra el documento
app.use(express.static(path.join(__dirname, 'views')));// se empieza a buscar en la carpeta views.

// Rutas

// Pagina Madre
app.get('/', (req, res) => {
    res.render('madre_usuario.html');
});

// INICIO SESION
app.get('/login', (req, res) => {
    res.render('inicio_sesion_usuario.html');
});

// INICIO SESION ADMIN
app.get('/login_adm', (req, res) => {
    res.render('inicio_sesion_admin.html');
});

// OLVIDO SU CONTRASEÑA
app.get('/olvido_contraseña', (req, res) => {
    res.render('forgot_password.html');
});

// RECUPERAR CONTRASEÑA
app.get('/recuperar_contraseña', (req, res) => {
    res.render('reset_password.html');
});

// PERFIL USUARIO
app.get('/perfil', (req, res) => {
    res.render('perfil_usuario.html');
});

// SOCIAL PERFILES
app.get('/social', (req, res) => {
    res.render('social_perfiles.html');
});

// DENUNCIAS USUARIOS
app.get('/denuncias', (req, res) => {
    res.render('denuncias_usuarios.html');
});

// DENUNCIAS USUARIOS DEV
app.get('/denuncias_dev', (req, res) => {
    res.render('denuncias_dev.html');
});

// NOTICIAS Y AVISOS
app.get('/noticias', (req, res) => {
    res.render('noticias_usuarios.html');
});

// FORMULARIO NOTICIAS ADMIN
app.get('/noticias_avisos_admin', (req, res) => {
    res.render('noticias_avisos_admin.html');
});

// SERVICIOS
app.get('/servicios', (req, res) => {
    res.render('servicios.html');
});

// ADMINISTRACION DE USUARIOS
app.get('/administracion_usuarios', (req, res) => {
    res.render('administracion_usuarios.html');
});


// -----------------------------------------------------------
// Server Setup
app.listen(PORT,console.log(
    `Server started on port ${PORT}`));
