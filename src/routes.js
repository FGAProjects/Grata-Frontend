import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers//account/Login";
import Signup from "./containers/account/Signup";
import LayoutOff from './containers/layout/LayoutOff';
import Profile from "./containers/Profile";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/" component={LayoutOff} />
        <Route exact path="/create/" component={AssignmentCreate} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route exact path="/assignments/:id" component={AssignmentDetail} />
        <Route exact path="/profile/:id" component={Profile} />
    </Hoc>
);

export default BaseRouter;