var express = require('express');
var router = express.Router();
const db = require('../database');
const requestIp= require('request-ip')

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

  db.insert(name, email, comment, now, ip);

  res.redirect('/contactos');
});

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});


module.exports = router;
