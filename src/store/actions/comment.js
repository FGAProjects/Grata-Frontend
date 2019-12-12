import axios from 'axios';
import {
    GET_COMMENT_START, GET_COMMENT_SUCCESS, GET_COMMENT_FAIL,
    GET_COMMENT_LIST_START, GET_COMMENT_LIST_SUCCESS, GET_COMMENT_LIST_FAIL
} from './actionsTypes';

const createCommentStart = () => {
    
    return {
        type: GET_COMMENT_START
    };
}

const createCommentSuccess = comment => {
    
    return {
    
        type: GET_COMMENT_SUCCESS,
        comment
    };
}

const createCommentFail = error => {
    
    return {
    
        type: GET_COMMENT_FAIL,
        error: error
    };
}

const getCommentsListStart = () => {
    
    return {
        type: GET_COMMENT_LIST_START
    };
}

const getCommentsListSuccess = comments => {
    
    return {
    
        type: GET_COMMENT_LIST_SUCCESS,
        comments
    };
}

const getCommentsListFail = error => {
    
    return {
    
        type: GET_COMMENT_LIST_FAIL,
        error: error
    };
}

export const getComments = (token, questtionaire_id) => {
    
    return dispatch => {
    
        dispatch(getCommentsListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`https://api-grata.herokuapp.com/comments/detail/${ questtionaire_id }/`)
        .then(res => {
            const comments = res.data;
            dispatch(getCommentsListSuccess(comments));
        })
        .catch(err => {
            dispatch(getCommentsListFail(err));
        });
    };
};

export const createComment = (token, comment) => {

    return dispatch => {
    
        dispatch(createCommentStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('https://api-grata.herokuapp.com/comments/create/', comment)
        .then(comment => {
            dispatch(createCommentSuccess(comment));
        })
        .catch(err => {
            dispatch(createCommentFail(err));
        });
    };
};

export const deleteComment = (token, comment_id) => {
    
    return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${ token }`
		};
        axios.delete(`https://api-grata.herokuapp.com/comments/delete/${ comment_id }/`);
	};
}