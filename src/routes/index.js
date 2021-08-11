
const express = require("express");
const router = express.Router();
const authRutas = require('./auth')
const ProductoSchema = require('../schemas/productos')

router.use('/auth', authRutas)

router.route('/')
  .get((req, res) => {
    res.send('Server runing...');
});

router.route('/productos')
  .get((req, res) => {
      ProductoSchema.find().then((productos) => {
        res.status(200).send(productos);
      }).catch((error) => {
        res.status(400).send(error);
      });
  })
  .post((req, res) => {
    if (!req.body.nombre || typeof req.body.nombre !== 'string') {
      return res.status(400).send({message: 'Nombre invalido'});
    }
    if (typeof req.body.descripcion !== 'string') {
      return res.status(400).send({message: 'Descripción invalida'});
    }
    if (!req.body.precio || typeof req.body.precio !== 'number') {
      return res.status(400).send({message: 'Precio invalido'});
    }

    const producto = new ProductoSchema( {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio
    })
    producto.save().then((productoNuevo) => {
      res.status(201).send(productoNuevo);
    }).catch((error) => {
      res.status(400).send(error);
    });
  })
  .put((req, res) => {
    if (!req.query.id || typeof req.query.id !== 'string') {
      return res.status(400).send({message: 'ID invalido'});
    }
    if (!req.body.nombre || typeof req.body.nombre !== 'string') {
      return res.status(400).send({message: 'Nombre invalido'});
    }
    if (typeof req.body.descripcion !== 'string') {
      return res.status(400).send({message: 'Descripción invalida'});
    }
    if (!req.body.precio || typeof req.body.precio !== 'number') {
      return res.status(400).send({message: 'Precio invalido'});
    }
    ProductoSchema.findByIdAndUpdate( 
      req.query.id,
      {nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio}
    ).then((productoEditado) => {
      if (!productoEditado) {
        return res.status(400).send({message: 'Precio invalido'});
      } else {
        res.status(200).send(productoEditado);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  })
  .delete((req, res) => {
    console.log(req.query.id);
    if (!req.query.id) {
      return res.status(400).send({message: 'ID invalido'});
    }
    ProductoSchema.findOneAndDelete({_id: req.query.id}).then((productoEliminado) => {
      res.status(200).send(productoEliminado);
    }).catch((error) => {
      res.status(400).send(error);
    });
  })

module.exports = router