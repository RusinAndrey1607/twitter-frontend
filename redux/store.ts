import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import profileReducer from "./slices/ProfileSlice";
import tweetReducer from "./slices/TweetSlice";

const rootReducer = combineReducers({
  users: authReducer,
  profile:profileReducer,
  tweet:tweetReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

store.getState();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
