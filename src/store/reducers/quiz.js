import {
    GET_QUIZ_LIST_START, GET_QUIZ_LIST_SUCCESS, GET_QUIZ_LIST_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
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

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_QUIZ_LIST_START:
            return getQuizListStart(state, action);
        case GET_QUIZ_LIST_SUCCESS:
            return getQuizListSuccess(state, action);
        case GET_QUIZ_LIST_FAIL:
            return getQuizListFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;