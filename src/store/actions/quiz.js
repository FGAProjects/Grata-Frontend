import axios from 'axios';
import {
    CREATE_QUESTTIONAIRE_QUIZ_START, CREATE_QUESTTIONAIRE_QUIZ_SUCCESS, CREATE_QUESTTIONAIRE_QUIZ_FAIL,
    GET_QUESTTIONAIRE_MEETING_LIST_START, GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS, GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
    GET_QUESTTIONAIRE_DETAIL_START, GET_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTTIONAIRE_DETAIL_FAIL,
    GET_QUESTION_QUESTTIONAIRE_DETAIL_START, GET_QUESTION_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTION_QUESTTIONAIRE_DETAIL_FAIL
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

export const getQuestionsMeeting = (token, quizId) => {
    
    return dispatch => {
    
        dispatch(getQuestionListQuesttionaireDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/quiz/detail/${ quizId }/`)
        .then(res => {
            const questions = res.data;
            dispatch(getQuestionListQuesttionaireDetailSuccess(questions));
        })
        .catch(err => {
            dispatch(getQuestionListQuesttionaireDetailFail(err));
        });
    };
};