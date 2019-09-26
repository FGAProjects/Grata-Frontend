import { 
    CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, CREATE_TOPIC_FAIL,
    TOPIC_LIST_START, TOPIC_LIST_SUCCESS, TOPIC_LIST_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    
    topics: [],
    error: null,
    loading: false
};

const createTopicStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
};

const createTopicSuccess = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: false
    });
};

const createTopicFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
};

const getTopicListStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
};

const getTopicListSuccess = (state, action) => {

    return updateObject(state, {

        topics: action.topics,
        error: null,
        loading: false
    });
};

const getTopicListFail = (state, action) => {

    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case TOPIC_LIST_START:
            return getTopicListStart(state, action);
        case TOPIC_LIST_SUCCESS:
            return getTopicListSuccess(state, action);
        case TOPIC_LIST_FAIL:
            return getTopicListFail(state, action);
        case CREATE_TOPIC_START:
            return createTopicStart(state, action);
        case CREATE_TOPIC_SUCCESS:
            return createTopicSuccess(state, action);
        case CREATE_TOPIC_FAIL:
            return createTopicFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;