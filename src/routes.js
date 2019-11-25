import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from "./hoc/hoc";

import Login from './containers/user/Login';
import Homepage from './containers/homepage/Homepage';
import UserRegister from './containers/user/UserRegister';
import UserDetail from './containers/user/UserDetail';
import UserEdit from './containers/user/UserEdit';
import UserList from './containers/user/UserList';
import UserMeeting from './containers/user/UserListMeeting';
import ProjectList from './containers/projects/ProjectList';
import ProjectCreate from './containers/projects/ProjectCreate';
import ProjectEdit from './containers/projects/ProjectEdit';
import MeetingCreate from './containers/meetings/MeetingCreate';
import MeetingList from './containers/meetings/MeetingList';
import MeetingDetail from './containers/meetings/MeetingDetail';
import MeetingEdit from './containers/meetings/MeetingEdit';
import MeetingConfirm from './containers/meetings/MeetingConfirm';
import TopicsCreate from './containers/topics/TopicsCreate';
import SectorCreate from './containers/sectors/SectorCreate';
import SectorEdit from './containers/sectors/SectorEdit';
import SectorList from './containers/sectors/SectorList';
import RulesCreate from './containers/rules/RulesCreate';
import Record from './containers/record/Record';
import QuizCreator from './containers/quiz/QuizCreator';
import ResultsQuiz from './containers/quiz/ResultsQuiz';
import QuizDetail from './containers/quiz/QuizDetail';

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
        <Route exact path = '/editar_projeto/:project_id/' component = { ProjectEdit } />
        <Route exact path = '/criar_reuniao/projeto/:project_id/' 
                            component = { MeetingCreate } />
        <Route exact path = '/lista_de_reunioes/:project_id/' component = { MeetingList } />
        <Route exact path = '/detalhes_reuniao/:meeting_id/:project_id/' 
                            component = { MeetingDetail } />
        <Route exact path = '/reuniao_confirmada/:meeting_id/:project_id/' 
                            component = { MeetingConfirm } />
        <Route exact path = '/editar_reuniao/:meeting_id/:project_id' component = { MeetingEdit } />
        <Route exact path = '/criar_topicos/:meeting_id/' component = { TopicsCreate } />
        <Route exact path = '/criar_setor/' component = { SectorCreate } /> 
        <Route exact path = '/editar_setor/:sector_id' component = { SectorEdit } />
        <Route exact path = '/lista_de_setores/' component = { SectorList } />
        <Route exact path = '/criar_regras/:meeting_id/' component = { RulesCreate } />
        <Route exact path = '/adicionar_usuarios_a_reuniao/:meeting_id/' component = { UserMeeting } />
        <Route exact path = '/visualizar_ata/:meeting_id/:project_id/' component = { Record } />
        <Route exact path = '/criar_questionario/:meeting_id/:project_id/' component = { QuizCreator } />
        <Route exact path = '/responder_questionario/:meeting_id/' component = { QuizCreator } />
        <Route exact path = '/resultado_questionario/:meeting_id/:project_id/:quiz_id' 
                            component = { ResultsQuiz } />
        <Route exact path = '/detalhes_questionario/:meeting_id/:project_id/:quiz_id' 
                            component = { QuizDetail } />
    </Hoc>
);

export default BaseRouter;