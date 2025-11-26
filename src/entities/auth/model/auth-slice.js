import { store } from "@/app/store/index.js";
import { authApi } from "../api/auth";

export const AUTH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  session: null,
  isAuthenticated: false,
  status: AUTH_STATUS.IDLE,
  error: null,
};

export const authSlice = {
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => ({
      ...state,
      status: AUTH_STATUS.LOADING,
      error: null,
    }),

    setRegistrationSuccess: (state, action) => ({
      ...state,
      status: AUTH_STATUS.SUCCEEDED,
      error: null,
      session: action.payload.session,
      isAuthenticated: !!action.payload.session,
    }),

    setError: (state, action) => ({
      ...state,
      status: AUTH_STATUS.FAILED,
      error: action.payload,
      session: null,
      isAuthenticated: false,
    }),

    clearError: (state) => ({
      ...state,
      error: null,
    }),

    resetAuth: () => initialState,
  },
};

export async function registerUser(formData) {
  const currentState = store.getState().auth;

  if (currentState.status === AUTH_STATUS.LOADING) {
    return;
  }

  store.dispatch({ type: "auth/setLoading" });

  try {
    const signUpData = await authApi.registerUser(formData);

    console.log("signUpData: ", signUpData);

    store.dispatch({
      type: "auth/setSession",
      payload: {
        session: signUpData.session,
      },
    });

    return signUpData;
  } catch (err) {
    const errorMessage = err.message || "Не удалось завершить регистрацию";
    store.dispatch({
      type: "auth/setError",
      payload: errorMessage,
    });
    throw err;
  }
}
