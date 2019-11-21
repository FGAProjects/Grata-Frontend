import axios from 'axios';
import {
    CREATE_QUIZ_START, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAIL,
    GET_QUIZ_LIST_START, GET_QUIZ_LIST_SUCCESS, GET_QUIZ_LIST_FAIL
} from './actionsTypes';

const createQuizStart = () => {
    
    return {
        type: CREATE_QUIZ_START
    };
}

const createQuizSuccess = quiz => {
    
    return {
    
        type: CREATE_QUIZ_SUCCESS,
        quiz
    };
}

const createQuizFail = error => {
    
    return {
    
        type: CREATE_QUIZ_FAIL,
        error: error
    };
}

const getQuizListStart = () => {
    
    return {
        type: GET_QUIZ_LIST_START
    };
}

const getQuizListSuccess = questtionaire => {
    
    return {
    
        type: GET_QUIZ_LIST_SUCCESS,
        questtionaire
    };
}

const getQuizListFail = error => {
    
    return {
    
        type: GET_QUIZ_LIST_FAIL,
        error: error
    };
}

export const getQuesttionaire = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getQuizListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/meetings/meetings_project/${ meetingId }/`)
        .then(res => {
            const questtionaire = res.data;
            dispatch(getQuizListSuccess(questtionaire));
        })
        .catch(err => {
            dispatch(getQuizListFail(err));
        });
    };
};

export const createQuiz = (token, quiz) => {

    return dispatch => {
    
        dispatch(createQuizStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('http://0.0.0.0:8000/questionnaires/create/', quiz)
        .then(quiz => {
            dispatch(createQuizSuccess(quiz));
        })
        .catch(err => {
            dispatch(createQuizFail(err));
        });
    };
};