import React from 'react';
import { Route } from 'react-router-dom';
import Hoc from './hoc/hoc';

import UserMeeting from './containers/user/UserListMeeting';
import MeetingCreate from './containers/meetings/MeetingCreate';
import MeetingList from './containers/meetings/MeetingList';
import MeetingDetail from './containers/meetings/MeetingDetail';
import MeetingEdit from './containers/meetings/MeetingEdit';
import MeetingConfirm from './containers/meetings/MeetingConfirm';
import TopicsCreate from './containers/topics/TopicsCreate';
import RulesCreate from './containers/rules/RulesCreate';
import QuizCreator from './containers/quiz/QuizCreator';
import ResultsQuiz from './containers/quiz/ResultsQuiz';
import RespondQuiz from './containers/quiz/RespondQuiz';
import Manuals from './containers/manuals/Manuals';

import Login from './containers/user/Login';
import Homepage from './containers/homepage/Homepage';
import UserDetail from './containers/user/UserDetail';
import UserOptions from './containers/user/UserOptions';
import SectorsOptions from './containers/sectors/SectorsOptions';
import SectorEdit from './containers/sectors/SectorEdit';
import ProjectsOptions from './containers/projects/ProjectsOptions';
import ProjectList from './containers/projects/ProjectList';
import ProjectEdit from './containers/projects/ProjectEdit';

const BaseRouter = () => (
    <Hoc>

        <Route exact path = '/' component = { Homepage } />
        <Route exact path = '/login/' component = { Login } />
        <Route exact path = '/informacoes_usuario/' component = { UserDetail } />
        <Route exact path = '/opcoes_usuario/' component = { UserOptions } />
        <Route exact path = '/opcoes_setores/' component = { SectorsOptions } />
        <Route exact path = '/editar_setor/:sector_id/' component = { SectorEdit } />
        <Route exact path = '/opcoes_projetos/' component = { ProjectsOptions } />
        <Route exact path = '/manuais/' component = { Manuals } />
        <Route exact path = '/lista_de_projetos/' component = { ProjectList } />
        <Route exact path = '/editar_projeto/:project_id/' component = { ProjectEdit } />

        <Route exact path = '/criar_reuniao/projeto/:project_id/' 
                            component = { MeetingCreate } />
        <Route exact path = '/lista_de_reunioes/:project_id/' component = { MeetingList } />
        <Route exact path = '/detalhes_reuniao/:meeting_id/:project_id/' 
                            component = { MeetingDetail } />
        <Route exact path = '/reuniao_confirmada/:meeting_id/' 
                            component = { MeetingConfirm } />
        <Route exact path = '/editar_reuniao/:meeting_id/:project_id' component = { MeetingEdit } />
        <Route exact path = '/criar_topicos/:meeting_id/' component = { TopicsCreate } />
        
        <Route exact path = '/criar_regras/:meeting_id/' component = { RulesCreate } />
        <Route exact path = '/adicionar_usuarios_a_reuniao/:meeting_id/' component = { UserMeeting } />
        <Route exact path = '/criar_questionario/:meeting_id/' component = { QuizCreator } />
        <Route exact path = '/responder_questionario/:meeting_id/:questtionaire_id/' 
                            component = { RespondQuiz } />
        <Route exact path = '/resultado_questionario/:meeting_id/:questtionaire_id/' 
                            component = { ResultsQuiz } />

        
    </Hoc>
);

export default BaseRouter;