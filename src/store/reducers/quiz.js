import {
    GET_QUIZ_LIST_START, GET_QUIZ_LIST_SUCCESS, GET_QUIZ_LIST_FAIL,
    GET_QUIZ_DETAIL_START, GET_QUIZ_DETAIL_SUCCESS, GET_QUIZ_DETAIL_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
    currentQuiz: {},
    questtionaire: [],
    error: null,
    loading: false
};

const getQuizListStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getQuizListSuccess = (state, action) => {
    
    return updateObject(state, {
    
        questtionaire: action.questtionaire,
        error: null,
        loading: false
    });
};

const getQuizListFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const getQuizDetailStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getQuizDetailSuccess = (state, action) => {
    
    return updateObject(state, {
    
        currentQuiz: action.quiz,
        error: null,
        loading: false
    });
};

const getQuizDetailFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_QUIZ_LIST_START:
            return getQuizListStart(state, action);
        case GET_QUIZ_LIST_SUCCESS:
            return getQuizListSuccess(state, action);
        case GET_QUIZ_LIST_FAIL:
            return getQuizListFail(state, action);
        case GET_QUIZ_DETAIL_START:
            return getQuizDetailStart(state, action);
        case GET_QUIZ_DETAIL_SUCCESS:
            return getQuizDetailSuccess(state, action);
        case GET_QUIZ_DETAIL_FAIL:
            return getQuizDetailFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;