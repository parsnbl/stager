import { configureStore } from '@reduxjs/toolkit';
import { plansSlice } from './reducers/planSlice.js';
import { userSlice } from './reducers/userSlice.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    plan: plansSlice,
  },
});


export default store;