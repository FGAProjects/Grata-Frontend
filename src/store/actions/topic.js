import axios from 'axios';
import { 
    CREATE_TOPIC_START, CREATE_TOPIC_SUCCESS, CREATE_TOPIC_FAIL,
    TOPIC_LIST_START, TOPIC_LIST_SUCCESS, TOPIC_LIST_FAIL 
} from './actionsTypes';

const createTopicStart = () => {

    return {
        type: CREATE_TOPIC_START
    };
} 

const createTopicSuccess = topic => {

    return {
        
        type: CREATE_TOPIC_SUCCESS,
        topic
    };
}
  
const createTopicFail = error => {

    return {

        type: CREATE_TOPIC_FAIL,
        error: error
    };
}
  
const getTopicListStart = () => {

    return {
        type: TOPIC_LIST_START
    }
}

const getTopicListSuccess = topics => {

    return {
        
        type: TOPIC_LIST_SUCCESS,
        topics
    };
}

const getTopicListFail = error => {

    return {

        type: TOPIC_LIST_FAIL,
        error: error
    };
}

export const createTopic = (token, topic) => {

    return dispatch => {
    
        dispatch(createTopicStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.post('http://0.0.0.0:8000/topics/create/', topic)
        .then(topic => {
            dispatch(createTopicSuccess(topic));
        })
        .catch(err => {
            dispatch(createTopicFail(err));
        });
    };
};

export const getTopics = (token, meeting_id) => {

    return dispatch => {
    
        dispatch(getTopicListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${ token }`
        };
        axios.get(`http://0.0.0.0:8000/meetings/meetings_topics/${ meeting_id }/`)
        .then(res => {
            const topics = res.data;
            dispatch(getTopicListSuccess(topics));
        })
        .catch(err => {
            dispatch(getTopicListFail(err));
        });
    };
}

export const deleteTopic = (token, topic_id) => {
    
    return dispatch => {
    
        axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${ token }`
		};
        axios.delete(`http://0.0.0.0:8000/projects/delete/${ topic_id }/`);
	};
}