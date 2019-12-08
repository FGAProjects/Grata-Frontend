import {
    GET_COMMENT_LIST_START, GET_COMMENT_LIST_SUCCESS, GET_COMMENT_LIST_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
    comments: [],
    error: null,
    loading: false
};

const getCommentsListStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getCommentsListSuccess = (state, action) => {
    
    return updateObject(state, {
    
        comments: action.comments,
        error: null,
        loading: false
    });
};

const getCommentsListFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_COMMENT_LIST_START:
            return getCommentsListStart(state, action);
        case GET_COMMENT_LIST_SUCCESS:
            return getCommentsListSuccess(state, action);
        case GET_COMMENT_LIST_FAIL:
            return getCommentsListFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;