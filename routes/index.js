var express = require('express');
var router = express.Router();
const db = require('../database');
const requestIp= require('request-ip');
const { request } = require('http');
const { json } = require('body-parser');
const geoip = require('geoip-lite')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
  const geo = geoip.lookup("186.92.82.190");
  loc = (geo.country);

  

  db.insert(name, email, comment, now, ip, loc);

  res.redirect('/contactos');
});

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});


module.exports = router;
