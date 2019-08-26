import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    username: null,
    is_student: null,
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

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default reducer;