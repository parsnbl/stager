import { configureStore } from '@reduxjs/toolkit';
import planSlice from './reducers/planSlice.js';
import { userSlice } from './reducers/userSlice.js';

const store = configureStore({
  reducer: {
    plan: planSlice,
  },
});


export default store;