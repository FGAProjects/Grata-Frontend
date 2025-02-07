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

export const authLogin = (username, password) => {
	
	return dispatch => {
	
		dispatch(authStart());
		axios.post('https://api-grata.herokuapp.com/rest-auth/login/', {
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
				sector: res.data.sector,
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

export const authSignup = (user) => {
	
	return dispatch => {
	
		dispatch(authStart());
		axios.post('https://api-grata.herokuapp.com/rest-auth/registration/', user)
		.catch(err => {
			dispatch(authFail(err));
		});
	};
};

export const getUsers = (token) => {
	
	return dispatch => {
	
		dispatch(getUserListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get('https://api-grata.herokuapp.com/users/')
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
		axios.get(`https://api-grata.herokuapp.com/users/informacoes/${ userId }/`)
		.then(res => {
			const user = res.data;
			dispatch(authSuccess(user));
		})
		.catch(err => {
			dispatch(authFail(err));
		});
	};
}

export const updateUser = (token, userObject) => {
	
	return dispatch => {
	
		dispatch(authStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		axios.put(`https://api-grata.herokuapp.com/users/alterar_informacoes/${ userObject.userId }/`, 
		userObject)
		.then(res => {
			const user = {
				token: token,
				username: userObject.username,
				userId: userObject.userId,
				is_administrator: userObject.is_administrator,
				ramal: userObject.ramal,
				name: userObject.name,
				email: userObject.email,
				sector: userObject.sector,
				is_participant: !userObject.is_administrator,
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
		axios.delete(`https://api-grata.herokuapp.com/users/excluir_usuario/${ userId }/`)
		dispatch(logout());
	};
}