import { 
    MEETING_LIST_START, MEETING_LIST_SUCCESS, MEETING_LIST_FAIL,
    CREATE_MEETING_START, CREATE_MEETING_SUCCESS, CREATE_MEETING_FAIL,
    GET_MEETING_DETAIL_START, GET_MEETING_DETAIL_SUCCESS, GET_MEETING_DETAIL_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
    meetings: [],
    currentMeeting: {},
    error: null,
    loading: false
};

const getMeetingListStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getMeetingListSuccess = (state, action) => {
    
    return updateObject(state, {
    
        meetings: action.meetings,
        error: null,
        loading: false
    });
};

const getMeetingListFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const getMeetingDetailStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const getMeetingDetailSuccess = (state, action) => {
    
    return updateObject(state, {
    
        currentMeeting: action.meeting,
        error: null,
        loading: false
    });
};

const getMeetingDetailFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const createMeetingStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const createMeetingSuccess = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: false
    });
};

const createMeetingFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case MEETING_LIST_START:
            return getMeetingListStart(state, action);
        case MEETING_LIST_SUCCESS:
            return getMeetingListSuccess(state, action);
        case MEETING_LIST_FAIL:
            return getMeetingListFail(state, action);
        case GET_MEETING_DETAIL_START:
            return getMeetingDetailStart(state, action);
        case GET_MEETING_DETAIL_SUCCESS:
            return getMeetingDetailSuccess(state, action);
        case GET_MEETING_DETAIL_FAIL:
            return getMeetingDetailFail(state, action);
        case CREATE_MEETING_START:
            return createMeetingStart(state, action);
        case CREATE_MEETING_SUCCESS:
            return createMeetingSuccess(state, action);
        case CREATE_MEETING_FAIL:
            return createMeetingFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;