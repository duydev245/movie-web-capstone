import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrentUser } from '../../interfaces/user.interface';
import { getLocalStorage } from '../../utils';

const userLocalStorage = getLocalStorage<CurrentUser>('user');

type UserState = {
  currentUser: CurrentUser | null;
};

const initialState: UserState = {
  currentUser: userLocalStorage,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<CurrentUser>) => {
      state.currentUser = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
