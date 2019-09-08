import {
    SECTOR_LIST_START, SECTOR_LIST_SUCCESS, SECTOR_LIST_FAIL,
    GET_SECTOR_DETAIL_START, GET_SECTOR_DETAIL_SUCCESS, GET_SECTOR_DETAIL_FAIL,
    CREATE_SECTOR_START, CREATE_SECTOR_SUCCESS, CREATE_SECTOR_FAIL
} from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    sectors: [],
    sectorId: null,
    initials: null,
    name: null,
    error: null,
    loading: false
};

const getSectorListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getSectorListSuccess = (state, action) => {
    return updateObject(state, {
        sectors: action.sectors,
        error: null,
        loading: false
    });
};

const getSectorListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};
  
const getSectorDetailStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getSectorDetailSuccess = (state, action) => {
    return updateObject(state, {
        sectorId: action.sector.sectorId,
        initials: action.sector.initials,
        name: action.sector.name,
        error: null,
        loading: false
    });
};

const getSectorDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const createSectorStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const createSectorSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
};

const createSectorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTOR_LIST_START:
            return getSectorListStart(state, action);
        case SECTOR_LIST_SUCCESS:
            return getSectorListSuccess(state, action);
        case SECTOR_LIST_FAIL:
            return getSectorListFail(state, action);
        case GET_SECTOR_DETAIL_START:
            return getSectorDetailStart(state, action);
        case GET_SECTOR_DETAIL_SUCCESS:
            return getSectorDetailSuccess(state, action);
        case GET_SECTOR_DETAIL_FAIL:
            return getSectorDetailFail(state, action);
        case CREATE_SECTOR_START:
            return createSectorStart(state, action);
        case CREATE_SECTOR_SUCCESS:
            return createSectorSuccess(state, action);
        case CREATE_SECTOR_FAIL:
            return createSectorFail(state, action);
        default:
            return state;
    }
};
  
export default reducer;