const express = require("express");
const router = express.Router();
const UsuarioSchema = require('../../schemas/usuarios')
const crypto = require('crypto')

router.route('/login')
  .post((req, res) => {
    
    if (!req.body.email || typeof req.body.email !== 'string') {
        return res.status(400).send({message: 'Email invalido'});
      }
      if (!req.body.password || typeof req.body.password !== 'string') {
        return res.status(400).send({message: 'Password invalido'});
      }
    //const md5_password = crypto.createHash('md5').update(req.body.password).digest("hex");
  
    UsuarioSchema.findOne({email:req.body.email, password: req.body.password}).then((usuario) => {
      
      console.log(usuario)
        if (usuario) {
            res.status(200).send(usuario);
        } else {
            res.status(404).send({message: 'Email o contraseña incorrecto.'});
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
  })

router.route('/usuarios')
  .get((req, res) => {
    UsuarioSchema.find().then((usuarios) => {
        res.status(200).send(usuarios);
      }).catch((error) => {
        res.status(400).send(error);
      });
  })
  

module.exports = router