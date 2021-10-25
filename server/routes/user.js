const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroler');


//create, find, update, delete

router.get('/cadastro', userController.view);

router.post('/', userController.find);
router.get('/addprodutos', userController.form);
router.post('/addprodutos', userController.create);
router.get('/editprodutos/:id', userController.edit);
router.post('/editprodutos/:id', userController.update);
router.get('/lojaprodutos/', userController.viewall);
router.get('/gerarboleto/:id', userController.loja);

router.post('/gerarboleto/:id', userController.comprar);

router.get('/:id', userController.delete);

module.exports = router;



