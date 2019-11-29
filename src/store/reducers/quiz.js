import {
    GET_QUESTTIONAIRE_MEETING_LIST_START, GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS, GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
    GET_QUESTTIONAIRE_DETAIL_START, GET_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTTIONAIRE_DETAIL_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {

    currentQuesttionaire: {},
    questtionaires: [],
    error: null,
    loading: false
}

const getQuesttionaireMeetingListStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getQuesttionaireMeetingListSuccess = (state, action) => {

    return updateObject(state, {

        questtionaires: action.questtionaires,
        error: null,
        loading: false
    });
}

const getQuesttionaireMeetingListFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const getQuesttionaireDetailStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getQuesttionaireDetailSuccess = (state, action) => {

    return updateObject(state, {

        currentQuesttionaire: action.questtionaire,
        error: null,
        loading: false
    });
}

const getQuesttionaireDetailFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_QUESTTIONAIRE_MEETING_LIST_START:
            return getQuesttionaireMeetingListStart(state, action);
        case GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS:
            return getQuesttionaireMeetingListSuccess(state, action);
        case GET_QUESTTIONAIRE_MEETING_LIST_FAIL:
            return getQuesttionaireMeetingListFail(state, action);
        case GET_QUESTTIONAIRE_DETAIL_START:
            return getQuesttionaireDetailStart(state, action);
        case GET_QUESTTIONAIRE_DETAIL_SUCCESS:
            return getQuesttionaireDetailSuccess(state, action);
        case GET_QUESTTIONAIRE_DETAIL_FAIL:
            return getQuesttionaireDetailFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;

// const initialState = {
    
//     currentQuiz: {},
//     quizMeeting: [],
//     questtionaire: [],
//     error: null,
//     loading: false
// };




// const getQuizMeetingListStart = (state, action) => {
    
//     return updateObject(state, {
    
//         error: null,
//         loading: true
//     });
// };

// const getQuizMeetingListSuccess = (state, action) => {
    
//     return updateObject(state, {
    
//         quizMeeting: action.quizMeeting,
//         error: null,
//         loading: false
//     });
// };

// const getQuizMeetingListFail = (state, action) => {
    
//     return updateObject(state, {
    
//         error: action.error,
//         loading: false
//     });
// };

// const getQuizDetailStart = (state, action) => {
    
//     return updateObject(state, {
    
//         error: null,
//         loading: true
//     });
// };

// const getQuizDetailSuccess = (state, action) => {
    
//     return updateObject(state, {
    
//         currentQuiz: action.quiz,
//         error: null,
//         loading: false
//     });
// };

// const getQuizDetailFail = (state, action) => {
    
//     return updateObject(state, {
    
//         error: action.error,
//         loading: false
//     });
// };

