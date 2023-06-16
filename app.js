var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// //Passport
// const passport = require('./store/passport');
// const session = require('express-session');

// // Aquí debes configurar las opciones para la sesión
// const sessionOptions = {
//   secret: 'un secreto muy secreto', // Aquí debes poner una cadena aleatoria que sirve para firmar las cookies de sesión
//   resave: false, // Esto indica que no se debe guardar la sesión si no se modificó
//   saveUninitialized: false // Esto indica que no se debe guardar la sesión si no se inicializó algún dato
// };

// // Aquí debes usar express-session como middleware con las opciones definidas
// app.use(session(sessionOptions));

// // Aquí debes inicializar passport como middleware
// app.use(passport.initialize());

// // Aquí debes habilitar passport para manejar las sesiones como middleware
// app.use(passport.session());

// // Aquí puedes definir tus rutas y controladores como lo harías normalmente

module.exports = app;
