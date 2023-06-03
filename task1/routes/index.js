var express = require('express');
var router = express.Router();
const db = require('../database');
const requestIp= require('request-ip');
const { request } = require('http');
const { json } = require('body-parser');
const geoip = require('geoip-lite')
const nodemailer = require('nodemailer')
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const usuario = process.env.EMAIL_USER2
const passha = process.env.EMAIL_PASS2

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let email = req.body._replyto;
  let comment = req.body.comment;
  let date = new Date(); 
  const clientIp = requestIp.getClientIp(req)
  const ip = clientIp
  let now = date.toLocaleString()
  // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // @todo falta formatear la ip
  let loc
   // replace with the IP address you want to look up
  const geo = geoip.lookup(ip);
  loc = (geo.country);

  db.insert(name, email, comment, now, ip, loc);
  
  //Crear Transportador de correo
  var transporter = nodemailer.createTransport ({
    
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // service: 'gmail',
    auth: {
      // type: 'PLAIN',
      // user: usuario,
      // pass: passha
      user: 'kendalltrece@gmail.com',
      pass: 'wolootvvtmvrwjri'
    }
  });

  // Crear un objeto de opciones de correo
  var mailOptions = {
    nombre: name,
    from: email,
    to: "kelvinpaez2004@gmail.com",
    subject: 'Contacto desde el formulario',
    text: "Enviado por " + name + "\nEmail: " + email + "\nMensaje: " + comment
  };

  // Enviar el correo electrónico con el transportador
  transporter.sendMail (mailOptions, function (error, info) {
    // Manejar el error o la respuesta
    if (error) {
      console.log (error);
      res.send ('Ocurrió un error al enviar el correo.');
    } else {
      console.log ('Correo enviado: ' + info.response);
      res.send ('Correo enviado correctamente.');
    }
  });
  res.redirect('/contactos');
});
  

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('Se ha guardado la informacion del formularion en la base de datos y se envio el correo electronico');
});


module.exports = router;
