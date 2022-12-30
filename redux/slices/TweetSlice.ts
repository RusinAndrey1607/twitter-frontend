import { tweetService } from "../../axios/TweetService";
import { ITweet } from "./../../interfaces/ITweet";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  error: string;
  isLoading: boolean;
  tweets: ITweet[];
}
const initialState: ProfileState = {
  isLoading: false,
  error: "",
  tweets: [],
};

//Thunks

export const addTweetThunk = createAsyncThunk(
  "tweet/creation",
  async (tweet: FormData, { rejectWithValue }) => {
    try {
      const response = await tweetService.create(tweet);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loadTweetsThunk = createAsyncThunk<any,{ limit: number; offset: number }>("tweet/loading", async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const response = await tweetService.getTweets(limit, offset);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});


//Thunks
const TweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTweetThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addTweetThunk.fulfilled,
      (state, action: PayloadAction<ITweet>) => {
        state.isLoading = false;
        state.error = "";
      }
    );
    builder.addCase(addTweetThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loadTweetsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loadTweetsThunk.fulfilled,
      (state, action: PayloadAction<ITweet[]>) => {
        state.isLoading = false;
        state.tweets = action.payload.reverse()
        state.error = "";
      }
    );
    builder.addCase(loadTweetsThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload as string
    });
  },
});

export default TweetSlice.reducer;
