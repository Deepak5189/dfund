import { LOGOUT } from "../constants/authConstants";
import * as types from "../constants/userConstants";

const initialState = {
    user: {},
    publicUsers: [],
    publicUserProfile: {},
    userError: null,
}

const userReducer = (state = initialState, action: {state: any, action: any}) => {
    const {type, payload} = action;

    switch (type){
        case LOGOUT:
            return {
                ...state,
                user: {},
                publicUsers: [],
                publicUserProfile: {},
                userError: null,
            };
        
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                userError: null,
            };
        case types.GET_USER_FAIL:
            return {
                ...state,
                userError: payload,
            };
        case types.GET_PUBLIC_USERS_SUCCESS:
            return {
                ...state,
                publicUsers: payload||[],
                userError: null,
            };
        case types.GET_PUBLIC_USERS_FAIL:
            return {
                ...state,
                userError: payload,
            };
        case types.GET_PUBLIC_USER_PROFILE_SUCCESS:
            return {
                ...state,
                publicUserProfile: payload || {},
                userError: null,
            };
        case types.GET_PUBLIC_USER_PROFILE_FAIL:
            return {
                ...state,
                userError: payload,
            };
        default:
            return state;
    }
};

export default userReducer;