
const express = require("express");
const session = require("express-session");
const flash = require('connect-flash');
const app = express();
const port = 8000;


app.use(session({secret: 'mipropiaclave'}));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// pwermite que el servidor lea las carpetas estarticas de acceso publico
app.use('/public',express.static("public"));

//accedemos al sistema de rutas definidos en la carpeta de rutas (servicio en este caso) 
app.use(require('./router/servicios'));

app.listen(port, () => console.log(`Listening on port: ${port}`));