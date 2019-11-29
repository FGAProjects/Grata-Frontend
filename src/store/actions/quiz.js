import axios from 'axios';
import {
    CREATE_QUESTTIONAIRE_QUIZ_START, CREATE_QUESTTIONAIRE_QUIZ_SUCCESS, CREATE_QUESTTIONAIRE_QUIZ_FAIL,
    GET_QUESTTIONAIRE_MEETING_LIST_START, GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS, GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
    GET_QUESTTIONAIRE_DETAIL_START, GET_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTTIONAIRE_DETAIL_FAIL
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

export const getQuesttionaireMeeting = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getQuesttionaireMeetingListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/questionnaires/questtionaires_meeting/${ meetingId }/`)
        .then(res => {
            const questtionaires = res.data;
            dispatch(getQuettionaireMeetingListSuccess(questtionaires));
        })
        .catch(err => {
            dispatch(getQuesttionaireMeetingListFail(err));
        });
    };
};

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


  

  
// const getQuizDetailFail = error => {
    
//     return {
    
//         type: GET_QUIZ_DETAIL_FAIL,
//         error: error
//     };
// };

// const getQuizMeetingListStart = () => {
    
//     return {
//         type: GET_QUIZ_MEETING_LIST_START
//     };
// }

// const getQuizMeetingListSuccess = quizMeeting => {
    
//     return {
    
//         type: GET_QUIZ_MEETING_LIST_SUCCESS,
//         quizMeeting
//     };
// }

// const getQuizMeetingListFail = error => {
    
//     return {
    
//         type: GET_QUIZ_MEETING_LIST_FAIL,
//         error: error
//     };
// }

// const getQuizDetailStart = () => {
    
//     return {
//         type: GET_QUIZ_DETAIL_START
//     };
// };
  
// const getQuizDetailSuccess = quiz => {
    
//     return {
    
//         type: GET_QUIZ_DETAIL_SUCCESS,
//         quiz
//     };
// };
  
// const getQuizDetailFail = error => {
    
//     return {
    
//         type: GET_QUIZ_DETAIL_FAIL,
//         error: error
//     };
// };



// export const getQuizMeeting = (token, meetingId) => {
    
//     return dispatch => {
    
//         dispatch(getQuizMeetingListStart());
//         axios.defaults.headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${ token }`
//         };
//         axios.get(`http://0.0.0.0:8000/questionnaires/quiz_meeting/${ meetingId }/`)
//         .then(res => {
//             const questtionaireMeeting = res.data;
//             dispatch(getQuizMeetingListSuccess(questtionaireMeeting));
//         })
//         .catch(err => {
//             dispatch(getQuizMeetingListFail(err));
//         });
//     };
// };

// export const createQuiz = (token, quiz) => {

//     return dispatch => {
    
//         dispatch(createQuizStart());
//         axios.defaults.headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${ token }`
//         };
//         axios.post('http://0.0.0.0:8000/questionnaires/create/', quiz)
//         .then(quiz => {
//             dispatch(createQuizSuccess(quiz));
//         })
//         .catch(err => {
//             dispatch(createQuizFail(err));
//         });
//     };
// };

// export const getQuiz = (token, quizId) => {

//     return dispatch => {
    
//         dispatch(getQuizDetailStart());
//         axios.defaults.headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${ token }`
//         };
//         axios.get(`http://0.0.0.0:8000/questionnaires/detail/${ quizId }/`)
//         .then(res => {
//             const quiz = res.data;
//             dispatch(getQuizDetailSuccess(quiz));
//         })
//         .catch(err => {
//             dispatch(getQuizDetailFail(err));
//         });
//     };
// };