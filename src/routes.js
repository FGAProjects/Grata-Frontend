import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from "./hoc/hoc";

import Login from './containers/account/Login';
import Signup from './containers/account/Signup';
import Homepage from './containers/homepage/Homepage';
import UserDetail from './containers/account/UserDetail';
import UserEdit from './containers/account/UserEdit';
import UserList from './containers/account/UserList';
import ProjectCreate from './containers/projects/ProjectCreate';
import ProjectList from './containers/projects/ProjectList';
import ProjectDetail from './containers/projects/ProjectDetail';

const BaseRouter = () => (
    <Hoc>
        <Route exact path = '/' component = { Homepage } />
        <Route exact path = '/login/' component = { Login } />
        <Route exact path = '/adicionar_usuario/' component = { Signup } />
        <Route exact path = '/informacoes_usuario/' component = { UserDetail } />
        <Route exact path = '/lista_usuarios/' component = { UserList } />
        <Route exact path = '/alterar_informacoes/' component = { UserEdit } />
        <Route exact path = '/criar_projeto/' component = { ProjectCreate } />
        <Route exact path = '/lista_projetos/' component = { ProjectList } />
        <Route exact path = '/informacoes_projeto/:id' component = { ProjectDetail } />
    </Hoc>
);

export default BaseRouter;