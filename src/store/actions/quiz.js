import axios from 'axios';
import {
    CREATE_QUESTTIONAIRE_QUIZ_START, CREATE_QUESTTIONAIRE_QUIZ_SUCCESS, CREATE_QUESTTIONAIRE_QUIZ_FAIL,
    GET_QUESTTIONAIRE_MEETING_LIST_START, GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS, GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
    GET_QUESTTIONAIRE_DETAIL_START, GET_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTTIONAIRE_DETAIL_FAIL,
    GET_QUESTION_QUESTTIONAIRE_DETAIL_START, GET_QUESTION_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTION_QUESTTIONAIRE_DETAIL_FAIL,
    CREATE_RESPOND_QUIZ_START, CREATE_RESPOND_QUIZ_SUCCESS, CREATE_RESPOND_QUIZ_FAIL,
    GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_START, GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_SUCCESS, GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_FAIL,
    GET_ALL_GRADED_QUESTIIONAIRE_START, GET_ALL_GRADED_QUESTIIONAIRE_SUCCESS, GET_ALL_GRADED_QUESTIIONAIRE_FAIL
} from './actionsTypes';

const createQuesttionaireQuizStart = () => {

    return {
        type: CREATE_QUESTTIONAIRE_QUIZ_START
    };
}

const createQuesttionaireQuizSuccess = questtionaire => {

    return {

        type: CREATE_QUESTTIONAIRE_QUIZ_SUCCESS,
        questtionaire
    };
}

const createQuesttionaireQuizFail = error => {

    return {

        type: CREATE_QUESTTIONAIRE_QUIZ_FAIL,
        error: error
    }
}

const getQuesttionaireMeetingListStart = () => {

    return {
        type: GET_QUESTTIONAIRE_MEETING_LIST_START
    }
}

const getQuettionaireMeetingListSuccess = questtionaires => {

    return {

        type: GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS,
        questtionaires
    }
}

const getQuesttionaireMeetingListFail = error => {

    return {

        type: GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
        error: error
    }
}

const getQuesttionaireDetailStart = () => {

    return {
        type: GET_QUESTTIONAIRE_DETAIL_START
    };
}

const getQuesttionaireDetailSuccess = questtionaire => {

    return {

        type: GET_QUESTTIONAIRE_DETAIL_SUCCESS,
        questtionaire
    }
}

const getQuesttionaireDetailFail = error => {

    return {

        type: GET_QUESTTIONAIRE_DETAIL_FAIL,
        error: error
    }
}

const getQuestionListQuesttionaireDetailStart = () => {

    return {
        type: GET_QUESTION_QUESTTIONAIRE_DETAIL_START
    };
}

const getQuestionListQuesttionaireDetailSuccess = questions => {

    return {

        type: GET_QUESTION_QUESTTIONAIRE_DETAIL_SUCCESS,
        questions
    };
}

const getQuestionListQuesttionaireDetailFail = error => {

    return {

        type: GET_QUESTION_QUESTTIONAIRE_DETAIL_FAIL,
        error: error
    };
}

const createRespondQuizStart = () => {

    return {
        type: CREATE_RESPOND_QUIZ_START
    };
}

const createRespondQuizSuccess = respondQuiz => {

    return {

        type: CREATE_RESPOND_QUIZ_SUCCESS,
        respondQuiz
    }
}

const createRespondQuizFail = error => {

    return {

        type: CREATE_RESPOND_QUIZ_FAIL,
        error: error
    }
}

const getGradedQuesttionaireInQuesttionaireListStart = () => {

    return {
        type: GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_START
    }
}

const getGradedQuesttionaireInQuesttionaireListSuccess = resultsGraded => {

    return {

        type: GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_SUCCESS,
        resultsGraded
    }
}

const getGradedQuesttionaireQuesttionaireListFail = error => {

    return {

        type: GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_FAIL,
        error: error
    }
}

const getAllGradedListStart = () => {

    return {
        type: GET_ALL_GRADED_QUESTIIONAIRE_START
    };
}

const getAllGradedListSuccess = graded => {

    return {

        type: GET_ALL_GRADED_QUESTIIONAIRE_SUCCESS,
        graded
    };
}

const getAllGradedListFail = error => {

    return {

        type: GET_ALL_GRADED_QUESTIIONAIRE_FAIL,
        error: error
    };
}

export const createQuesttionaireQuiz = (token, quiz) => {

    return dispatch => {
    
        dispatch(createQuesttionaireQuizStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('http://0.0.0.0:8000/questionnaires/create/', quiz)
        .then(questtionaire => {
            dispatch(createQuesttionaireQuizSuccess(questtionaire));
        })
        .catch(err => {
            dispatch(createQuesttionaireQuizFail(err));
        });
    };
};

export const getQuesttionaireMeeting = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getQuesttionaireMeetingListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/meetings/questtionaires_meeting/${ meetingId }/`)
        .then(res => {
            const questtionaires = res.data;
            dispatch(getQuettionaireMeetingListSuccess(questtionaires));
        })
        .catch(err => {
            dispatch(getQuesttionaireMeetingListFail(err));
        });
    };
};

export const getQuesttionaire = (token, quizId) => {

    return dispatch => {
    
        dispatch(getQuesttionaireDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/questionnaires/detail/${ quizId }/`)
        .then(res => {
            const questtionaire = res.data;
            dispatch(getQuesttionaireDetailSuccess(questtionaire));
        })
        .catch(err => {
            dispatch(getQuesttionaireDetailFail(err));
        });
    };
};

export const getQuestionsMeeting = (token, questtionaireId) => {
    
    return dispatch => {
    
        dispatch(getQuestionListQuesttionaireDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/quiz/detail/${ questtionaireId }/`)
        .then(res => {
            const questions = res.data;
            dispatch(getQuestionListQuesttionaireDetailSuccess(questions));
        })
        .catch(err => {
            dispatch(getQuestionListQuesttionaireDetailFail(err));
        });
    };
};

export const createRespondQuiz = (token, respondQuiz) => {

    return dispatch => {
    
        dispatch(createRespondQuizStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('http://0.0.0.0:8000/graded_questtionaire/create/', respondQuiz)
        .then(respondQuizData => {
            dispatch(createRespondQuizSuccess(respondQuizData));
        })
        .catch(err => {
            dispatch(createRespondQuizFail(err));
        });
    };
};

export const getGradedQuesttionaires = (token, questtionaireId) => {
    
    return dispatch => {
    
        dispatch(getGradedQuesttionaireInQuesttionaireListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/graded_questtionaire/list_in_questtionaire/${ questtionaireId }/`)
        .then(res => {
            const resultsGraded = res.data;
            dispatch(getGradedQuesttionaireInQuesttionaireListSuccess(resultsGraded));
        })
        .catch(err => {
            dispatch(getGradedQuesttionaireQuesttionaireListFail(err));
        });
    };
};

export const getAllGraded = (token) => {
    
    return dispatch => {
    
        dispatch(getAllGradedListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get('http://0.0.0.0:8000/graded_questtionaire/')
        .then(res => {
            const graded = res.data;
            dispatch(getAllGradedListSuccess(graded));
        })
        .catch(err => {
            dispatch(getAllGradedListFail(err));
        });
    };
};