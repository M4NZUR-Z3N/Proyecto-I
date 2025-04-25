// Requiring module
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const bcrypt = require('bcrypt');

// Creating express object
const app = express();

app.use(express.urlencoded({ extended: true }));
const multer = require('multer'); //Juan Jose se agrega multer para la carga de archivos
const path = require('path');
const user = require('./models/users.js');
const noticia = require('./models/noticia.js'); // Juan Jose se agrega noticia para la carga de archivos
const aviso = require('./models/avisos.js');// Juan Jose se agrega aviso para la carga de archivos
const denuncia = require('./models/denuncias.js');// Juan Jose se agrega denuncia para la carga de archivos
app.use(cookieParser());
app.use(session({
    secret: "tu-clave-secreta",
    resave: false,
    saveUninitialized: false,
}));

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // El usuario está autenticado, continuar con la siguiente función
    }
    // Si no está autenticado, redirigir a la página de inicio de sesión
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next(); // El usuario es admin, continuar con la siguiente función
    }
    // Si no es admin, redirigir o enviar un mensaje de error
    return res.status(403).send("Acceso denegado: se requiere rol de administrador.");
}

// Juan José esta es la Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads')); // Ruta a la subcarpeta uploads dentro de public
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ message: 'Archivo subido exitosamente!', file: req.file });
    } else {
        res.status(400).json({ message: 'No se subió ningún archivo' });
    }
});


// Port Number
const PORT = process.env.PORT ||5000;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));// se empieza a buscar en la carpeta public. se sigue un orden en gerarquia, pasando de public a views si no se encuentra el documento
app.use(express.static(path.join(__dirname, 'views')));// se empieza a buscar en la carpeta views.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
    res.locals.user = req.session.user; // Hacer la sesión disponible en todas las vistas
    next();
});

// Rutas

// Pagina Madre
app.get('/', (req, res) => {
    res.render('madre_usuario.html');
});

// INICIO SESION
app.get('/login', (req, res) => {
    res.render('inicio_sesion_usuario');
});

// INICIO SESION ADMIN
app.get('/login_adm', (req, res) => {
    res.render('inicio_sesion_admin');
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
app.get('/perfil', isAuthenticated, (req, res) => {
    res.render('perfil_usuario', { user: req.session.user });
});

// SOCIAL PERFILES
app.get('/social', isAuthenticated, (req, res) => {
    res.render('social_perfiles.html');
});

// Juan José se hizo en DENUNCIAS USUARIOS
app.get('/denuncias_usuarios', isAuthenticated, async (req, res) => {
    try {
        const denuncias = await denuncia.find(); // Obtiene todas las denuncias
        res.render('denuncias_usuarios', { denuncias }); // Pasa las denuncias a la vista
    } catch (err) {
        console.error("Error al obtener las denuncias:", err);
        res.status(500).send("Error al obtener las denuncias");
    }
});

// Juan Jose se hizo esta modificacion en DENUNCIAS USUARIOS DEV
app.get('/denuncias_dev', isAdmin, async (req, res) => {
    try {
        const denuncias = await denuncia.find(); 
        res.render('denuncias_dev', { denuncias }); 
    } catch (err) {
        console.error("Error al obtener las denuncias:", err);
        res.status(500).send("Error al obtener las denuncias");
    }
});

// Juan Jose se hizo esta modificacion en  NOTICIAS Y AVISOS
app.get('/noticias_usuarios', async (req, res) => {
    try {
        const noticias = await noticia.find(); 
        const avisos = await aviso.find(); 
        res.render('noticias_usuarios', { noticias, avisos }); 
    } catch (err) {
        console.error("Error al obtener noticias y avisos:", err);
        res.status(500).send("Error al obtener noticias y avisos");
    }
});

// FORMULARIO NOTICIAS ADMIN
app.get('/noticias_avisos_admin', isAdmin, (req, res) => {
    res.render('noticias_avisos_admin.html');
});

// SERVICIOS
app.get('/servicios', (req, res) => {
    res.render('servicios.html');
});

// ADMINISTRACION DE USUARIOS
app.get('/administracion_usuarios', isAdmin, (req, res) => {
    res.render('administracion_usuarios.html');
});

//POST

app.post('/register', async (req, res) => {
    try {

        const usuarioExiste = await user.findOne({ cedula: req.body.cedula });

        if (usuarioExiste) {
            // Si el usuario ya existe, renderiza la página de registro con un mensaje de error
            return res.render('inicio_sesion_usuario', { error: "Este usuario ya existe, por favor inicie sesion." });
        }

        let data = new user({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cedula: req.body.cedula,
            correo: req.body.email2,
            password: await bcrypt.hash(req.body.passwordR, 10),
            telefono: req.body.telefono,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            role: 'user'
        });

        await data.save();
        console.log("Usuario registrado exitosamente");
        res.redirect('/login');
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        res.render('inicio_sesion_usuario', { error: "Error al registrar usuario." });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await user.findOne({ correo: email });

        if (usuario) {
            const match = await bcrypt.compare(password, usuario.password);
            if (match) {
                req.session.user = {
                    username: usuario.nombre,
                    telefono: usuario.telefono,
                    distrito: usuario.distrito,
                    correo: usuario.correo,
                    role: usuario.role // Almacenar el rol
                };
                console.log("Se inició sesión correctamente");
                res.redirect('/'); // Redirige al usuario a la página principal
            } else {
                console.log("Las contraseñas no coinciden");
                res.status(401).send("Las contraseñas no coinciden");
            }
        } else {
            console.log("El usuario no existe");
            res.render('inicio_sesion_usuario', { error: "Este usuario no existe." });
        }
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.render('inicio_sesion_usuario', { error: "Error al iniciar sesion." });
    }
});

const USERNAME = 'administrador@administrador.com';
const PASSWORD = 'Administrador';

app.post('/loginAdmin', (req, res) =>{
    try {
        const { email, password } = req.body;
        if (email === USERNAME && password === PASSWORD) {
            req.session.user = {
                username: USERNAME,
                role: 'admin'
            };
            console.log("Se inició sesión correctamente");
            return res.redirect('/'); // Redirige al usuario a la página principal
        } else {
            console.log("Las credenciales no son válidas");
            return res.status(401).send("Las credenciales no son válidas");
        }
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        return res.status(500).send("Error al iniciar sesión");
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión
    });
});

//Juan Jose, acá se agregaron los 2 post de  noticias y denuncias
app.post('/noticia', isAdmin, upload.single('archivo_not'), async (req, res) => {
    try {
        let data;
        if (req.body.tipo_noticia === 'aviso') {
            data = new aviso({
                titulo: req.body.titulo_noticia,
                descripcion: req.body.descripcion_noticia,
                fecha: Date.now(),
                archivo: req.file ? {
                    filename: req.file.filename,
                    contentType: req.file.mimetype
                } : undefined 
            });
        } else {
            data = new noticia({
                titulo: req.body.titulo_noticia,
                descripcion: req.body.descripcion_noticia,
                fecha: Date.now(),
                archivo: req.file ? {
                    filename: req.file.filename,
                    contentType: req.file.mimetype
                } : undefined
            });
        }

        await data.save();
        console.log(`${req.body.tipo_noticia} registrado exitosamente`);
        res.redirect('/noticias_usuarios');
    } catch (err) {
        console.error("Error al registrar la noticia:", err);
        res.status(500).send("Error al registrar la noticia");
    }
});

app.post('/denuncia', isAdmin, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No se subió ningún archivo o el tipo de archivo no es permitido.');
        }

        let data = new denuncia({
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            archivo: {
                filename: req.file.filename,
                contentType: req.file.mimetype
            }
        });

        await data.save();
        console.log("Denuncia registrada exitosamente");
        res.redirect('/denuncias_dev');
    } catch (err) {
        console.error("Error al registrar la denuncia:", err);
        res.status(500).send("Error al registrar la denuncia");
    }
});

// -----------------------------------------------------------
// Server Setup
app.listen(PORT,console.log(
    `Server started on port ${PORT}`));
