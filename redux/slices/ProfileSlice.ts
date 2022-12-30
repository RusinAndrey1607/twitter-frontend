import { profileService } from "./../../axios/ProfileService";
import {
  IProfile,
  ProfileCreatetionAttributes,
} from "./../../interfaces/IProfile";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  error: string;
  isLoading: boolean;
  profile: IProfile;
}
const initialState: ProfileState = {
  isLoading: false,
  error: "",
  profile: {} as IProfile,
};

//Thunks

export const createProfileThunk = createAsyncThunk(
  "profile/creation",
  async (profile: FormData, { rejectWithValue }) => {
    try {
      const response = await profileService.create(profile);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateProfileThunk = createAsyncThunk(
  "profile/update",
  async (profile: FormData, { rejectWithValue }) => {
    try {
      const response = await profileService.update(profile);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const loadProfileThunk = createAsyncThunk(
  "profile/load",
  async (id, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//Thunks
const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createProfileThunk.fulfilled,
      (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = "";
      }
    );
    builder.addCase(createProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      updateProfileThunk.fulfilled,
      (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = "";
      }
    );
    builder.addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      loadProfileThunk.fulfilled,
      (state, action: PayloadAction<IProfile>) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = "";
      }
    );
    builder.addCase(loadProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default ProfileSlice.reducer;
