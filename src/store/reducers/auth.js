import { 
	AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT,
	USER_LIST_START, USER_LIST_SUCCESS, USER_LIST_FAIL 
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
	users: [],
    token: null,
    username: null,
	is_student: null,
	sector: null,
    ramal: null,
    is_teacher: null,
    name: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		loading: true
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.user.token,
		username: action.user.username,
		password: action.user.password,
		name: action.user.name,
		is_administrator: action.user.is_administrator,
		is_participant: action.user.is_participant,
		ramal: action.user.ramal,
		userId: action.user.userId,
		sector: action.user.sector,
		email: action.user.email,
		error: null,
		loading: false
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	});
};

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null
	});
};

const getUserListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getUserListSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        error: null,
        loading: false
    });
};

const getUserListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return authStart(state, action);
		case AUTH_SUCCESS:
			return authSuccess(state, action);
		case AUTH_FAIL:
			return authFail(state, action);
		case AUTH_LOGOUT:
			return authLogout(state, action);
		case USER_LIST_START:
			return getUserListStart(state, action);
		case USER_LIST_SUCCESS:
			return getUserListSuccess(state, action);
		case USER_LIST_FAIL:
			return getUserListFail(state, action);
		default:
			return state;
	}
};

export default reducer;