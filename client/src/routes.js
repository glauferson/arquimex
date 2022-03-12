import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from "./pages/admin/dashboard";

import Clientes from './pages/admin/clientes';
import ClienteEditar from "./pages/admin/clientes/clientes.editar";
import ClienteCadastrar from "./pages/admin/clientes/clientes.cadastrar";

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from "./pages/admin/usuarios/usuarios.editar";
import UsuarioCadastrar from "./pages/admin/usuarios/usuarios.cadastrar";

// IMPORTS CLIENT
import Home from './pages/client/home';
import ClienteDetails from './pages/client/clientes/clientes.details';
import Login from './pages/admin/login';

import PrivateRoute from './services/wAuth';


export default function AppRoutes(){

    return (
        
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Home} />
                <Route path="/clientes/:idCliente" exact component={ClienteDetails} />

                {/* Rota Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin" exact component={Dashboard} />
                
                <PrivateRoute path="/admin/clientes" exact component={Clientes} />
                <PrivateRoute path="/admin/clientes/cadastrar" exact component={ClienteCadastrar} />
                <PrivateRoute path="/admin/clientes/editar/:idCliente" exact component={ClienteEditar} />

                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />

            </Switch>
        </BrowserRouter>
            
    );
};