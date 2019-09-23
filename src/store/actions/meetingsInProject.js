import axios from 'axios';
import { 
    MEETING_LIST_START, MEETING_LIST_SUCCESS, MEETING_LIST_FAIL
} from './actionsTypes';

const getMeetingListStart = () => {
    
    return {
        type: MEETING_LIST_START
    };
}

const getMeetingListSuccess = meetings => {
    
    return {
    
        type: MEETING_LIST_SUCCESS,
        meetings
    };
}

const getMeetingListFail = error => {
    
    return {
    
        type: MEETING_LIST_FAIL,
        error: error
    };
}

export const getMeetings = (token, projectId) => {
    
    return dispatch => {
    
        dispatch(getMeetingListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get(`http://0.0.0.0:8000/meetings/meetings_project/${ projectId }/`)
        .then(res => {
            const meetings = res.data;
            dispatch(getMeetingListSuccess(meetings));
        })
        .catch(err => {
            dispatch(getMeetingListFail(err));
        });
    };
};