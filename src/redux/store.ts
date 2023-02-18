import {configureStore, AnyAction} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import persistedReducers from './reducer/index';
import logger from 'redux-logger';

const devMode = __DEV__;
const middleware: any[] = [];

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // to check these further
      },
    }).concat(logger),
});
if (devMode) {
  middleware.push(logger);
}

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
const storeConfig = () => {
  return {persistor, store};
};
export default storeConfig;
export type RootState = ReturnType<typeof store.getState>;
