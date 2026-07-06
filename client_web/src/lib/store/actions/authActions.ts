import * as api from "../api/authAPI"
import * as types from "../constants/authConstants"
import { isValidToken } from "@/lib/utils/authUtils";
import { refreshTokenAction } from "./refreshTokenAction";
import { AppDispatch } from "../store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const initializeAuth = () => async (dispatch: AppDispatch) => {
    const profile = localStorage.getItem("profile");
    const accessToken = profile?JSON.parse(profile).accessToken:null;
    const refreshToken = profile?JSON.parse(profile).refreshToken:null;

    if(accessToken && refreshToken){
        if(isValidToken(accessToken)){
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setUserData(profile?JSON.parse(profile).user:null));
        }else{
            await dispatch(refreshTokenAction(refreshToken));
        }
    }
};

export const setAccessToken = (accessToken: string) => async (dispatch: AppDispatch) => {
    dispatch({type: types.SET_ACCESS_TOKEN, payload: accessToken});
}

export const setRefreshToken = (refreshToken: string) => async (dispatch: AppDispatch) => {
    dispatch({type: types.SET_REFRESH_TOKEN, payload: refreshToken});
}

export const setUserData = (userData: any) => async (dispatch: AppDispatch) => {
    dispatch({type: types.SET_USER_DATA, payload: userData});
}

export const setInitialAuthState = (navigate: any) => async (dispatch: AppDispatch) => {
  await dispatch({ type: types.LOGOUT });
  navigate("/signin");
};

export const logoutAction = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await api.logout();
    localStorage.removeItem("profile");
    dispatch({ type: types.LOGOUT, payload: data });
  } catch (error) {
    dispatch({ type: types.LOGOUT, payload: types.ERROR_MESSAGE });
  }
};


export const signUpAction = (formData: any, navigate: any, isConsentGiven: boolean = false, email: string) =>
  async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("profile");
      const response = await api.signUp(formData);
      const { error } = response;
      if (error) {
        dispatch({
          type: types.SIGNUP_FAIL,
          payload: error,
        });
      } else {
        if (!isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/signin");
        }

        if (isConsentGiven) {
          dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: types.SIGNUP_SUCCESS_MESSAGE,
          });
          navigate("/auth/verify", { state: email });
        }
      }
    } catch (error) {
      dispatch({
        type: types.SIGNUP_FAIL,
        payload: types.ERROR_MESSAGE,
      });
    }
  };

export const signInAction = (formData: FormData, router: AppRouterInstance, callbackUrl: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.signIn(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.SIGNIN_FAIL,
        payload: error,
      });
    } else {
      const { user, accessToken, refreshToken, accessTokenUpdatedAt } = data;
      const profile = {
        user,
        accessToken,
        refreshToken,
        accessTokenUpdatedAt,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({
        type: types.SIGNIN_SUCCESS,
        payload: profile,
      });
      router.push(callbackUrl);
      router.refresh();
    }
  } catch (error) {
    await dispatch({
      type: types.SIGNIN_FAIL,
      payload: types.ERROR_MESSAGE,
    });
    navigate("/signin");
  }
};

// export const getModProfileAction = () => async (dispatch: any) => {
//   try {
//     const { error, data } = await api.getModProfile();
//     if (error) {
//       throw new Error(error);
//     }
//     dispatch({
//       type: types.GET_MOD_PROFILE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_MOD_PROFILE_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const getContextAuthDataAction = () => async (dispatch: any) => {
//   try {
//     const { error, data } = await api.getContextAuthData();
//     if (error) {
//       throw new Error(error);
//     }
//     dispatch({
//       type: types.GET_CONTEXT_AUTH_DATA_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_CONTEXT_AUTH_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const getTrustedContextAuthDataAction = () => async (dispatch: any) => {
//   try {
//     const { error, data } = await api.getTrustedContextAuthData();
//     if (error) {
//       throw new Error(error);
//     }
//     dispatch({
//       type: types.GET_TRUSTED_AUTH_CONTEXT_DATA_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_TRUSTED_AUTH_CONTEXT_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const getUserPreferencesAction = () => async (dispatch: any) => {
//   try {
//     const { error, data } = await api.getUserPreferences();
//     if (error) {
//       throw new Error(error);
//     }
//     dispatch({
//       type: types.GET_USER_PREFERENCES_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_USER_PREFERENCES_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const getBlockedAuthContextDataAction = () => async (dispatch: any) => {
//   try {
//     const { error, data } = await api.getBlockedAuthContextData();
//     if (error) {
//       throw new Error(error);
//     }
//     dispatch({
//       type: types.GET_BLOCKED_AUTH_CONTEXT_DATA_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.GET_BLOCKED_AUTH_CONTEXT_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const deleteContextAuthDataAction = (contextId: string) => async (dispatch: any) => {
//   try {
//     const { error } = await api.deleteContextAuthData(contextId);
//     if (error) {
//       throw new Error(error);
//     }
//   } catch (error) {
//     dispatch({
//       type: types.DELETE_CONTEXT_AUTH_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const blockContextAuthDataAction = (contextId: string) => async (dispatch: any) => {
//   try {
//     const { error } = await api.blockContextAuthData(contextId);
//     if (error) {
//       throw new Error(error);
//     }
//   } catch (error) {
//     dispatch({
//       type: types.BLOCK_CONTEXT_AUTH_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };

// export const unblockContextAuthDataAction = (contextId: string) => async (dispatch: any) => {
//   try {
//     const { error } = await api.unblockContextAuthData(contextId);
//     if (error) {
//       throw new Error(error);
//     }
//   } catch (error) {
//     dispatch({
//       type: types.UNBLOCK_CONTEXT_AUTH_DATA_FAIL,
//       payload: types.ERROR_MESSAGE,
//     });
//   }
// };
