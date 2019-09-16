import axios from 'axios';
import { 
        PROJECT_LIST_START, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAIL,
        GET_PROJECT_DETAIL_START, GET_PROJECT_DETAIL_SUCCESS, GET_PROJECT_DETAIL_FAIL,
        CREATE_PROJECT_START, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAIL
    } from './actionsTypes';

const getProjectListStart = () => {
    return {
        type: PROJECT_LIST_START
    };
};

const getProjectListSuccess = projects => {
    return {
        type: PROJECT_LIST_SUCCESS,
        projects
    };
};

const getProjectListFail = error => {
    return {
      type: PROJECT_LIST_FAIL,
      error: error
    };
};

const getProjectDetailStart = () => {
    return {
        type: GET_PROJECT_DETAIL_START
    };
};
  
const getProjectDetailSuccess = project => {
    return {
        type: GET_PROJECT_DETAIL_SUCCESS,
        project
    };
};
  
const getProjectDetailFail = error => {
    return {
        type: GET_PROJECT_DETAIL_FAIL,
        error: error
    };
};

const createProjectStart = () => {
    return {
        type: CREATE_PROJECT_START
    };
};
  
  const createProjectSuccess = project => {
    return {
        type: CREATE_PROJECT_SUCCESS,
        project
    };
};
  
  const createProjectFail = error => {
    return {
        type: CREATE_PROJECT_FAIL,
        error: error
    };
};

export const getProjects = token => {
    return dispatch => {
        dispatch(getProjectListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get('http://0.0.0.0:8000/projects/')
        .then(res => {
            const projects = res.data;
            dispatch(getProjectListSuccess(projects));
        })
        .catch(err => {
            dispatch(getProjectListFail(err));
        });
    };
};

export const getProject = (token, projectId) => {
    return dispatch => {
        dispatch(getProjectDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get(`http://0.0.0.0:8000/projects/detail/${ projectId }/`)
        .then(res => {
            const project = res.data;
            dispatch(getProjectDetailSuccess(project));
        })
        .catch(err => {
            dispatch(getProjectDetailFail(err));
        });
    };
};
  
export const createProject = (token, project) => {
    return dispatch => {
        dispatch(createProjectStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.post('http://0.0.0.0:8000/projects/create/', project)
        .then(res => {
            dispatch(createProjectSuccess(res));
        })
        .catch(err => {
            dispatch(createProjectFail(err));
        });
    };
};

export const updateProject = (token, projectObject) => {
    return dispatch => {
        dispatch(getProjectListStart());
        axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
        };
        axios.put(`http://0.0.0.0:8000/projects/update/${ projectObject.projectId }/`, 
        projectObject)
		.then(res => {
			const project = {
                projectId: projectObject.id,
				title: projectObject.title,
                status: projectObject.status,
                sector: projectObject.sector
            };
            dispatch(getProjectListSuccess(project));
		})
		.catch(err => {
            dispatch(getProjectListFail(err));
		});
    };
}

export const deleteProject = (token, projectId) => {
	return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${ token }`
		};
        axios.delete(`http://0.0.0.0:8000/projects/delete/${ projectId }/`);
	};
}