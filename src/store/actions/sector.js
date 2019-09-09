import axios from 'axios';
import {
    CREATE_SECTOR_START, CREATE_SECTOR_SUCCESS, CREATE_SECTOR_FAIL,
    SECTOR_LIST_START, SECTOR_LIST_SUCCESS, SECTOR_LIST_FAIL,
    GET_SECTOR_DETAIL_START, GET_SECTOR_DETAIL_SUCCESS, GET_SECTOR_DETAIL_FAIL
} from './actionsTypes';

const getSectorListStart = () => {
    return {
        type: SECTOR_LIST_START
    };
}

const getSectorListSuccess = sectors => {
    return {
        type: SECTOR_LIST_SUCCESS,
        sectors
    };
}

const getSectorListFail = error => {
    return {
        type: SECTOR_LIST_FAIL,
        error: error
    };
}

export const getSectors = token => {
    return dispatch => {
        dispatch(getSectorListStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get('http://0.0.0.0:8000/sectors/')
        .then(res => {
            const sectors = res.data;
            dispatch(getSectorListSuccess(sectors));
        })
        .catch(err => {
            dispatch(getSectorListFail(err));
        });
    };
};

const getSectorDetailStart = () => {
    return {
        type: GET_SECTOR_DETAIL_START
    };
}

const getSectorDetailSuccess = sector => {
    return {
        type: GET_SECTOR_DETAIL_SUCCESS,
        sector
    };
}
  
const getSectorDetailFail = error => {
    return {
        type: GET_SECTOR_DETAIL_FAIL,
        error: error
    }
}

export const getSector = (token, sectorId) => {
    return dispatch => {
        dispatch(getSectorDetailStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.get(`http://0.0.0.0:8000/sectors/detail/${sectorId}/`)
        .then(res => {
            const sector = res.data;
            dispatch(getSectorDetailSuccess(sector));
        })
        .catch(err => {
            dispatch(getSectorDetailFail(err));
        });
    };
};

const createSectorStart = () => {
    return {
        type: CREATE_SECTOR_START
    };
};
  
const createSectorSuccess = sector => {
    return {
        type: CREATE_SECTOR_SUCCESS,
        sector
    };
};
  
const createSectorFail = error => {
    return {
        type: CREATE_SECTOR_FAIL,
        error: error
    };
};
  
export const createSector = (token, sector) => {
    return dispatch => {
        dispatch(createSectorStart());
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        };
        axios.post('http://0.0.0.0:8000/sectors/create/', sector)
        .then(res => {
            dispatch(createSectorSuccess(res));
        })
        .catch(err => {
            dispatch(createSectorFail(err));
        });
    };
};

export const updateSector = (token, sectorObject) => {
	return dispatch => {
        console.log(sectorObject)
		dispatch(getSectorListStart());
		axios.defaults.headers = {
			'Content-Type': 'application/json',
		  	Authorization: `Token ${token}`
		};
		axios.put(`http://0.0.0.0:8000/sectors/update/${sectorObject.id}/`, sectorObject)
		.then(res => {
			const sector = {
                sectorId: sectorObject.id,
				initials: sectorObject.initials,
				name: sectorObject.name
			};
			dispatch(getSectorListSuccess(sector));
		})
		.catch(err => {
			dispatch(getSectorListFail(err));
		});
	};
}

export const deleteSector = (token, sectorId) => {
	return dispatch => {
		axios.defaults.headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${ token }`
		};
        axios.delete(`http://0.0.0.0:8000/sectors/delete/${sectorId}/`);
	};
}