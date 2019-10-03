import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from "./hoc/hoc";

import Login from './containers/account/Login';
import Homepage from './containers/homepage/Homepage';
import UserRegister from './containers/account/UserRegister';
import UserDetail from './containers/account/UserDetail';
import UserEdit from './containers/account/UserEdit';
import UserList from './containers/account/UserList';
import ProjectList from './containers/projects/ProjectList';
import ProjectCreate from './containers/projects/ProjectCreate';
import ProjectEdit from './containers/projects/ProjectEdit';
import MeetingCreate from './containers/meetings/MeetingCreate';
import MeetingList from './containers/meetings/MeetingList';
import MeetingDetail from './containers/meetings/MeetingDetail';
import MeetingEdit from './containers/meetings/MeetingEdit';
import TopicsCreate from './containers/topics/TopicsCreate';
import SectorCreate from './containers/sectors/SectorCreate';
import SectorEdit from './containers/sectors/SectorEdit';
import SectorList from './containers/sectors/SectorList';
import RulesCreate from './containers/rules/RulesCreate';

const BaseRouter = () => (
    <Hoc>
        <Route exact path = '/' component = { Homepage } />
        <Route exact path = '/login/' component = { Login } />
        <Route exact path = '/adicionar_usuario/' component = { UserRegister } />
        <Route exact path = '/informacoes_usuario/' component = { UserDetail } />
        <Route exact path = '/lista_usuarios/' component = { UserList } />
        <Route exact path = '/alterar_informacoes/' component = { UserEdit } />
        <Route exact path = '/lista_de_projetos/' component = { ProjectList } />
        <Route exact path = '/criar_projeto/' component = { ProjectCreate } />
        <Route exact path = '/editar_projeto/:project_id/:sector_id' component = { ProjectEdit } />
        <Route exact path = '/criar_reuniao/projeto/:project_id/:sector_id' 
                            component = { MeetingCreate } />
        <Route exact path = '/lista_de_reunioes/:project_id/:sector_id' component = { MeetingList } />
        <Route exact path = '/detalhes_reuniao/:meeting_id/:project_id/:sector_id' 
                            component = { MeetingDetail } />
        <Route exact path = '/editar_reuniao/:meeting_id/:project_id/:sector_id' 
                            component = { MeetingEdit } />
        <Route exact path = '/criar_topicos/:meeting_id/:project_id/:sector_id' 
                            component = { TopicsCreate } />
        <Route exact path = '/criar_setor/' component = { SectorCreate } /> 
        <Route exact path = '/editar_setor/:sector_id' component = { SectorEdit } />
        <Route exact path = '/lista_de_setores/' component = { SectorList } />
        <Route exact path = '/criar_regras/:meeting_id/:project_id/:sector_id' 
                            component = { RulesCreate } />
    </Hoc>
);

export default BaseRouter;