import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from "./hoc/hoc";

import Login from './containers/account/Login';
import Signup from './containers/account/Signup';
import Homepage from './containers/homepage/Homepage';
import UserDetail from './containers/account/UserDetail';
import UserEdit from './containers/account/UserEdit';
import AssignmentDetail from './containers/AssignmentDetail';

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/assignments/:id" component={AssignmentDetail} />
        <Route exact path="/informacoes_usuario/" component={UserDetail} />
        <Route exact path="/alterar_informacoes/" component={UserEdit} />
    </Hoc>
);

export default BaseRouter;