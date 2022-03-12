const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usuarios.controllers');
const Cliente = require('./controllers/clientes.controllers');


routes.get('/', Usuario.index);

// Rotas de Usuários
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id', Usuario.delete);
routes.put('/api/usuarios/', Usuario.update);
routes.post('/api/usuarios/login', Usuario.login);
routes.get('/api/usuarios/checktoken', Usuario.checkToken);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);


// Rotas de Clientes
routes.post('/api/clientes', Cliente.create);
routes.get('/api/clientes', Cliente.index);
routes.get('/api/clientes.details/:_id', Cliente.details);
routes.delete('/api/clientes/:_id', Cliente.delete);
routes.put('/api/clientes/', Cliente.update);

module.exports = routes;