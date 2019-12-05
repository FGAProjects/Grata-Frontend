import {
    GET_QUESTTIONAIRE_MEETING_LIST_START, GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS, GET_QUESTTIONAIRE_MEETING_LIST_FAIL,
    GET_QUESTTIONAIRE_DETAIL_START, GET_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTTIONAIRE_DETAIL_FAIL,
    GET_QUESTION_QUESTTIONAIRE_DETAIL_START, GET_QUESTION_QUESTTIONAIRE_DETAIL_SUCCESS, GET_QUESTION_QUESTTIONAIRE_DETAIL_FAIL,
    CREATE_RESPOND_QUIZ_START, CREATE_RESPOND_QUIZ_SUCCESS, CREATE_RESPOND_QUIZ_FAIL,
    GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_START, GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_SUCCESS, GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {

    currentQuesttionaire: {},
    questtionaires: [],
    questions: [],
    resultsGraded: [],
    error: null,
    loading: false
}

const getQuesttionaireMeetingListStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getQuesttionaireMeetingListSuccess = (state, action) => {

    return updateObject(state, {

        questtionaires: action.questtionaires,
        error: null,
        loading: false
    });
}

const getQuesttionaireMeetingListFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const getQuesttionaireDetailStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getQuesttionaireDetailSuccess = (state, action) => {

    return updateObject(state, {

        currentQuesttionaire: action.questtionaire,
        error: null,
        loading: false
    });
}

const getQuesttionaireDetailFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const getQuestionListQuesttionaireDetailStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getQuestionListQuesttionaireDetailSuccess = (state, action) => {

    return updateObject(state, {

        questions: action.questions,
        error: null,
        loading: false
    });
}

const getQuestionListQuesttionaireDetailFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const createRespondQuizStart = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: true
    });
};

const createRespondQuizSuccess = (state, action) => {
    
    return updateObject(state, {
    
        error: null,
        loading: false
    });
};

const createRespondQuizFail = (state, action) => {
    
    return updateObject(state, {
    
        error: action.error,
        loading: false
    });
};

const getGradedQuesttionaireInQuesttionaireListStart = (state, action) => {

    return updateObject(state, {

        error: null,
        loading: true
    });
}

const getGradedQuesttionaireInQuesttionaireListSuccess = (state, action) => {

    return updateObject(state, {

        resultsGraded: action.resultsGraded,
        error: null,
        loading: false
    });
}

const getGradedQuesttionaireQuesttionaireListFail = (state, action) => {

    return updateObject(state, {

        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
    
        case GET_QUESTTIONAIRE_MEETING_LIST_START:
            return getQuesttionaireMeetingListStart(state, action);
        case GET_QUESTTIONAIRE_MEETING_LIST_SUCCESS:
            return getQuesttionaireMeetingListSuccess(state, action);
        case GET_QUESTTIONAIRE_MEETING_LIST_FAIL:
            return getQuesttionaireMeetingListFail(state, action);
        case GET_QUESTTIONAIRE_DETAIL_START:
            return getQuesttionaireDetailStart(state, action);
        case GET_QUESTTIONAIRE_DETAIL_SUCCESS:
            return getQuesttionaireDetailSuccess(state, action);
        case GET_QUESTTIONAIRE_DETAIL_FAIL:
            return getQuesttionaireDetailFail(state, action);
        case GET_QUESTION_QUESTTIONAIRE_DETAIL_START:
            return getQuestionListQuesttionaireDetailStart(state, action);
        case GET_QUESTION_QUESTTIONAIRE_DETAIL_SUCCESS:
            return getQuestionListQuesttionaireDetailSuccess(state, action);
        case GET_QUESTION_QUESTTIONAIRE_DETAIL_FAIL:
            return getQuestionListQuesttionaireDetailFail(state, action);
        case CREATE_RESPOND_QUIZ_START:
            return createRespondQuizStart(state, action);
        case CREATE_RESPOND_QUIZ_SUCCESS:
            return createRespondQuizSuccess(state, action);
        case CREATE_RESPOND_QUIZ_FAIL:
            return createRespondQuizFail(state, action);
        case GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_START:
            return getGradedQuesttionaireInQuesttionaireListStart(state, action);
        case GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_SUCCESS:
            return getGradedQuesttionaireInQuesttionaireListSuccess(state, action);
        case GET_GRADED_QUESTTIONAIRE_IN_QUESTTIONAIRE_FAIL:
            return getGradedQuesttionaireQuesttionaireListFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;