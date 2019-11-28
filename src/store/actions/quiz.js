import axios from 'axios';
import {
    CREATE_QUIZ_START, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAIL,
    GET_QUIZ_LIST_START, GET_QUIZ_LIST_SUCCESS, GET_QUIZ_LIST_FAIL,
    GET_QUIZ_DETAIL_START, GET_QUIZ_DETAIL_SUCCESS, GET_QUIZ_DETAIL_FAIL,
    GET_QUIZ_MEETING_LIST_START, GET_QUIZ_MEETING_LIST_SUCCESS, GET_QUIZ_MEETING_LIST_FAIL
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

const getQuizMeetingListStart = () => {
    
    return {
        type: GET_QUIZ_MEETING_LIST_START
    };
}

const getQuizMeetingListSuccess = quizMeeting => {
    
    return {
    
        type: GET_QUIZ_MEETING_LIST_SUCCESS,
        quizMeeting
    };
}

const getQuizMeetingListFail = error => {
    
    return {
    
        type: GET_QUIZ_MEETING_LIST_FAIL,
        error: error
    };
}

const getQuizDetailStart = () => {
    
    return {
        type: GET_QUIZ_DETAIL_START
    };
};
  
const getQuizDetailSuccess = quiz => {
    
    return {
    
        type: GET_QUIZ_DETAIL_SUCCESS,
        quiz
    };
};
  
const getQuizDetailFail = error => {
    
    return {
    
        type: GET_QUIZ_DETAIL_FAIL,
        error: error
    };
};

export const getQuesttionaire = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getQuizListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/questionnaires/questtionaires_meeting/${ meetingId }/`)
        .then(res => {
            const questtionaire = res.data;
            dispatch(getQuizListSuccess(questtionaire));
        })
        .catch(err => {
            dispatch(getQuizListFail(err));
        });
    };
};

export const getQuizMeeting = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getQuizMeetingListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/questionnaires/quiz_meeting/${ meetingId }/`)
        .then(res => {
            const questtionaireMeeting = res.data;
            dispatch(getQuizMeetingListSuccess(questtionaireMeeting));
        })
        .catch(err => {
            dispatch(getQuizMeetingListFail(err));
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

export const getQuiz = (token, quizId) => {
    
    return dispatch => {
    
        dispatch(getQuizDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/questionnaires/detail/${ quizId }/`)
        .then(res => {
            const quiz = res.data;
            dispatch(getQuizDetailSuccess(quiz));
        })
        .catch(err => {
            dispatch(getQuizDetailFail(err));
        });
    };
};