import axios from 'axios';
import {
    GET_CHOICES_START, GET_CHOICES_SUCCESS, GET_CHOICES_FAIL
} from './actionsTypes';

const getChoicesListStart = () => {
    
    return {
        type: GET_CHOICES_START
    };
}

const getChoicesListSuccess = choices => {
    
    return {
    
        type: GET_CHOICES_SUCCESS,
        choices
    };
}

const getChoicesListFail = error => {
    
    return {
    
        type: GET_CHOICES_FAIL,
        error: error
    };
}

export const getChoices = (token) => {
    
    return dispatch => {
    
        dispatch(getChoicesListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get('https://api-grata.herokuapp.com/choices/')
        .then(res => {
            const choices = res.data;
            dispatch(getChoicesListSuccess(choices));
        })
        .catch(err => {
            dispatch(getChoicesListFail(err));
        });
    };
};