import axios from 'axios';
import { 
	AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT,
	USER_LIST_START, USER_LIST_SUCCESS, USER_LIST_FAIL 
} from './actionsTypes';

export const authStart = () => {
    return {
    	type: AUTH_START
  	};
};

export const authSuccess = user => {
  	return {
    	type: AUTH_SUCCESS,
    	user
  	};
};

export const authFail = error => {
  	return {
    	type: AUTH_FAIL,
    	error: error
  	};
};

export const logout = () => {
	localStorage.removeItem('user');
	return {
		type: AUTH_LOGOUT
	};
};

const getUserListStart = () => {
    return {
        type: USER_LIST_START
    };
};

const getUserListSuccess = users => {
    return {
        type: USER_LIST_SUCCESS,
        users
    };
};

const getUserListFail = error => {
    return {
      	type: USER_LIST_FAIL,
      	error: error
    };
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://0.0.0.0:8000/rest-auth/login/', {
			username: username,
			password: password
		})
		.then(res => {
			const user = {
				token: res.data.key,
				username,
				userId: res.data.user,
				is_administrator: res.data.user_type.is_administrator,
				is_participant: res.data.user_type.is_participant,
				ramal: res.data.ramal,
				name: res.data.name,
				expirationDate: new Date(new Date().getTime() + 3600 * 1000)
			};
			localStorage.setItem('user', JSON.stringify(user));
			dispatch(authSuccess(user));
			dispatch(checkAuthTimeout(3600));
		})
		.catch(err => {
			dispatch(authFail(err));
		});
	};
};

export const authSignup = ( username, name, ramal, email, 
						   password1, password2, is_administrator ) => {
	return dispatch => {
		dispatch(authStart());
		const user = { 
			username, email, password1, password2, is_administrator,
			is_participant: !is_administrator, ramal, name
		};
		axios.post('http://0.0.0.0:8000/rest-auth/registration/', user)
		.catch(err => {
			dispatch(authFail(err));
		});
	};
};

export const authCheckState = () => {
  	return dispatch => {
    	const user = JSON.parse(localStorage.getItem('user'));
		if (user === undefined || user === null) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(user.expirationDate);
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(user));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
  	};
};

export const getUsers = (token) => {
	return dispatch => {
        dispatch(getUserListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get('http://0.0.0.0:8000/users/')
        .then(res => {
			const users = res.data;
			localStorage.setItem('users', JSON.stringify(users));
			dispatch(getUserListSuccess(users));
        })
        .catch(err => {
            dispatch(getUserListFail(err));
        });
    };
}

export const getUser = (token, userId) => {
	return dispatch => {
		dispatch(authStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		axios.get(`http://0.0.0.0:8000/users/informacoes/${userId}/`)
		  .then(res => {
				const user = res.data;
				dispatch(authSuccess(user));
		  })
		  .catch(err => {
		  		dispatch(authFail(err));
		});
	};
}

export const updateUser = (token, userId, email, username, ramal, name, is_administrator) => {
	return dispatch => {
		dispatch(authStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		const user = { 
			email, username, ramal, name, is_administrator,
			is_participant: !is_administrator
		};
		axios.put(`http://0.0.0.0:8000/users/alterar_informacoes/${userId}/`, user)
		.then(res => {
			const user = {
				token: token,
				username,
				userId: userId,
				is_administrator,
				ramal,
				name,
				email,
				is_participant: !is_administrator,
				expirationDate: new Date(new Date().getTime() + 3600 * 1000)
			};
			localStorage.setItem('user', JSON.stringify(user));
			dispatch(authSuccess(user));
			dispatch(checkAuthTimeout(3600));
		})
		.catch(err => {
			dispatch(authFail(err));
		});
	};
}

export const deleteUser = (token, userId) => {
	return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		};
		axios.delete(`http://0.0.0.0:8000/users/excluir_usuario/${userId}/`)
		dispatch(logout());
	};
}