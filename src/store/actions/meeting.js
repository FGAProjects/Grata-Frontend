import axios from 'axios';
import { 
    CREATE_MEETING_START, CREATE_MEETING_SUCCESS, CREATE_MEETING_FAIL,
    GET_MEETING_DETAIL_START, GET_MEETING_DETAIL_SUCCESS, GET_MEETING_DETAIL_FAIL,
    MEETING_LIST_START, MEETING_LIST_SUCCESS, MEETING_LIST_FAIL
} from './actionsTypes';

const getMeetingDetailStart = () => {
    
    return {
        type: GET_MEETING_DETAIL_START 
    };
}

const getMeetingDetailSuccess = meeting => {
    
    return {
    
        type: GET_MEETING_DETAIL_SUCCESS,
        meeting
    };
}

const getMeetingDetailFail = error => {
    
    return {
    
        type: GET_MEETING_DETAIL_FAIL,
        error: error
    };
}

const createMeetingStart = () => {
    
    return {
        type: CREATE_MEETING_START
    };
}

const createMeetingSuccess = meeting => {
    
    return {
    
        type: CREATE_MEETING_SUCCESS,
        meeting
    };
}

const createMeetingFail = error => {
    
    return {
    
        type: CREATE_MEETING_FAIL,
        error: error
    };
}

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

export const getMeeting = (token, meetingId) => {
    
    return dispatch => {
    
        dispatch(getMeetingDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get(`http://0.0.0.0:8000/meetings/detail/${ meetingId }/`)
        .then(res => {
            const meeting = res.data;
            dispatch(getMeetingDetailSuccess(meeting));
        })
        .catch(err => {
            dispatch(getMeetingDetailFail(err));
        });
    };
};
  
export const createMeeting = (token, meeting) => {

    return dispatch => {
    
        dispatch(createMeetingStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('http://0.0.0.0:8000/meetings/create/', meeting)
        .then(meeting => {
            dispatch(createMeetingSuccess(meeting));
        })
        .catch(err => {
            dispatch(createMeetingFail(err));
        });
    };
};

export const updateMeeting = (token, meetingObject) => {

    return dispatch => {
    
        dispatch(getMeetingDetailStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${ token }`
		};
        axios.put(`http://0.0.0.0:8000/meetings/update/${ meetingObject.id }/`, 
        meetingObject)
		.then(meeting => {
			dispatch(getMeetingDetailSuccess(meeting.data));
		})
		.catch(err => {
			dispatch(getMeetingDetailFail(err));
		});
	};
}

export const deleteMeeting = (token, meetingId) => {
    
    return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${ token }`
		};
        axios.delete(`http://0.0.0.0:8000/meetings/delete/${ meetingId }/`);
	};
}