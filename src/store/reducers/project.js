import { 
    PROJECT_LIST_START, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAIL,
    GET_PROJECT_DETAIL_START, GET_PROJECT_DETAIL_SUCCESS, GET_PROJECT_DETAIL_FAIL,
    CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    projects: [],
    currentProject: {},
    error: null,
    loading: false
};

const getProjectListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getProjectListSuccess = (state, action) => {
    return updateObject(state, {
        projects: action.projects,
        error: null,
        loading: false
    });
};

const getProjectListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};
  
const getProjectDetailStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getProjectDetailSuccess = (state, action) => {
    return updateObject(state, {
        currentProject: action.project,
        error: null,
        loading: false
    });
};

const getProjectDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const createProjectStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createProjectSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const createProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_LIST_START:
            return getProjectListStart(state, action);
        case PROJECT_LIST_SUCCESS:
            return getProjectListSuccess(state, action);
        case PROJECT_LIST_FAIL:
            return getProjectListFail(state, action);
        case GET_PROJECT_DETAIL_START:
            return getProjectDetailStart(state, action);
        case GET_PROJECT_DETAIL_SUCCESS:
            return getProjectDetailSuccess(state, action);
        case GET_PROJECT_DETAIL_FAIL:
            return getProjectDetailFail(state, action);
        case CREATE_PROJECT_START:
            return createProjectStart(state, action);
        case CREATE_PROJECT_SUCCESS:
            return createProjectSuccess(state, action);
        case CREATE_PROJECT_FAIL:
            return createProjectFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;