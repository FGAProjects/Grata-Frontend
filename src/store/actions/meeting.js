import axios from 'axios';
import { 
    MEETING_LIST_START, MEETING_LIST_SUCCESS, MEETING_LIST_FAIL,
    CREATE_MEETING_START, CREATE_MEETING_SUCCESS, CREATE_MEETING_FAIL,
    GET_MEETING_DETAIL_START, GET_MEETING_DETAIL_SUCCESS, GET_MEETING_DETAIL_FAIL
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
  
export const getMeetings = token => {
    return dispatch => {
        dispatch(getMeetingListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get('http://0.0.0.0:8000/meetings/')
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
            Authorization: `Token ${token}`
        };
        axios.post('http://0.0.0.0:8000/meetings/create/', meeting)
        .then(res => {
            dispatch(createMeetingSuccess(res));
        })
        .catch(err => {
            dispatch(createMeetingFail(err));
        });
    };
};

export const updateMeeting = (token, meetingObject) => {
	return dispatch => {
		dispatch(getMeetingListStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		axios.put(`http://0.0.0.0:8000/meetings/update/${ meetingObject.id }/`, meetingObject)
		.then(res => {
			const meeting = {
                meetingId: meetingObject.id,
                title: meetingObject.title,
                subject_matter: meetingObject.subject_matter,
                status: meetingObject.status,
                first_date: meetingObject.first_date,
                final_date: meetingObject.final_date,
                first_hour: meetingObject.first_hour,
                final_hour: meetingObject.final_hour,
                meeting_leader: meetingObject.meeting_leader,
                place: meetingObject.place
			};
			dispatch(getMeetingListSuccess(meeting));
		})
		.catch(err => {
			dispatch(getMeetingListFail(err));
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