import {
    GET_CHOICES_START, GET_CHOICES_SUCCESS, GET_CHOICES_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
    choices: [],
    error: null,
    loading: false
};

const getChoicesListStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getChoicesListSuccess = (state, action) => {
    
    return updateObject(state, {
    
        choices: action.choices,
        error: null,
        loading: false
    });
};

const getChoicesListFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_CHOICES_START:
            return getChoicesListStart(state, action);
        case GET_CHOICES_SUCCESS:
            return getChoicesListSuccess(state, action);
        case GET_CHOICES_FAIL:
            return getChoicesListFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;