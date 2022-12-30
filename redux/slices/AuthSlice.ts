import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, UserCreationAttributes } from "../../interfaces/IUser";
import { authService } from "../../axios/AuthService";

interface AuthState {
  isAuth: boolean;
  user: IUser;
  error: string;
  isLoading: boolean;
}
const initialState: AuthState = {
  isAuth: false,
  isLoading: true,
  error: "",
  // @ts-ignore
  user: null as IUser,
};

//Thunks

export const registrationThunk = createAsyncThunk(
  "users/registration",
  async (userBody: UserCreationAttributes, { rejectWithValue }) => {
    try {
      const response = await authService.registration(userBody);

      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "users/login",
  async (userBody: UserCreationAttributes, { rejectWithValue }) => {
    try {
      const response = await authService.login(userBody);
      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const authThunk = createAsyncThunk(
  "users/auth",
  async (id, { rejectWithValue }) => {
    try {
      const response = await authService.auth();
      localStorage.setItem("token", response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  "users/logout",
  async (id, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem("token");
      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
//Thunks
const AuthSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(registrationThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registrationThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = "";
    });

    builder.addCase(authThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.isAuth = false;
      // @ts-ignore
      state.user = null as IUser;
      state.error = "";
    });
  },
});

export default AuthSlice.reducer;
