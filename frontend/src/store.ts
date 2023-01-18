import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import reducers from './reducers';

const store = configureStore({
  reducer: reducers,
  middleware: [thunk as ThunkMiddleware],
  devTools: !(process.env.REACT_APP_MODE === 'prod'),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
