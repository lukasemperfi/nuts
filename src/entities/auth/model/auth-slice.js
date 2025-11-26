// authSlice.js
import { store } from "@/app/store/index.js";
import { supabase } from "@/shared/api/supabase/client.js";
import { authApi } from "../api/auth";

export const AUTH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  user: null,
  session: null,
  isAuth: false,
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

    setAuth: (state, action) => ({
      ...state,
      status: AUTH_STATUS.SUCCEEDED,
      error: null,
      user: action.payload.user,
      session: action.payload.session,
      isAuth: !!action.payload.session,
    }),

    setError: (state, action) => ({
      ...state,
      status: AUTH_STATUS.FAILED,
      error: action.payload,
      user: null,
      session: null,
      isAuth: false,
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
  if (currentState.status === AUTH_STATUS.LOADING) return;

  store.dispatch({ type: "auth/setLoading" });

  try {
    const signUpData = await authApi.registerUser(formData);

    store.dispatch({
      type: "auth/setAuth",
      payload: {
        user: signUpData.user,
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

export async function loginUser(email, password) {
  store.dispatch({ type: "auth/setLoading" });

  try {
    const data = await authApi.login({ email, password });

    return data;
  } catch (err) {
    store.dispatch({
      type: "auth/setError",
      payload: err.message,
    });
    throw err;
  }
}

export async function logoutUser() {
  try {
    await authApi.logout();
  } catch (err) {
    console.error("Logout error:", err);
  }
}

export function initAuthListener() {
  authApi.onAuthChange((event, session) => {
    const current = store.getState().auth;

    const isAuthEvent =
      event === "INITIAL_SESSION" ||
      event === "SIGNED_IN" ||
      event === "TOKEN_REFRESHED" ||
      event === "USER_UPDATED";

    if (isAuthEvent) {
      const user = session?.user || null;
      console.log("event", event, "current", current);
      const sessionChanged =
        current.session?.access_token !== session?.access_token;

      const userChanged =
        current.user?.id !== user?.id ||
        JSON.stringify(current.user) !== JSON.stringify(user);

      if (sessionChanged || userChanged) {
        console.log("if something changed");
        store.dispatch({
          type: "auth/setAuth",
          payload: { user, session },
        });
      }

      return;
    }

    if (event === "SIGNED_OUT") {
      console.log("signed out event");
      if (current.isAuthenticated) {
        store.dispatch({ type: "auth/resetAuth" });
        console.log("log out");
      }
      return;
    }

    if (event === "PASSWORD_RECOVERY") {
      store.dispatch({ type: "auth/setPasswordRecovery" });
      return;
    }
  });
}
