import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../@types/User';
import userAPI, { CreateUserRequest } from '../api/user';

interface UserState {
  loading: boolean;
  users: { [id: string]: User };
}

const initialState: UserState = {
  users: {},
  loading: false,
};

interface AddUsersPayload {
  users?: User[];
}

interface AddUserPayload {
  user?: User;
}

interface DeleteUserPayload {
  userId?: string;
}

export const handleFetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await userAPI.fetchUsers();
      return { users: response.data };
    } catch (error) {}
    return {};
  },
);

export const handleCreateUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserRequest) => {
    try {
      const response = await userAPI.createUser(userData);
      return response;
    } catch (error) {}
    return {};
  },
);

export const handleDeleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    try {
      await userAPI.deleteUser(userId);
      return { userId };
    } catch (error) {}
    return { userId: '' };
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, { payload }: PayloadAction<AddUsersPayload>) => {
      const { users } = payload;
      if (users) {
        const newUserState = users.reduce(
          (acc: { [id: string]: User }, u: User) => ({ ...acc, [u.id]: u }),
          {},
        );
        state.users = newUserState;
      }
    },
    addUser: (state, { payload }: PayloadAction<AddUserPayload>) => {
      const { user } = payload;
      const { users } = state;
      if (user) {
        const newUserState = { [user.id]: user, ...users };
        state.users = newUserState;
      }
    },
    deleteUser: (state, { payload }: PayloadAction<DeleteUserPayload>) => {
      const { userId } = payload;
      if (userId) {
        const { users } = state;
        delete users[userId];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchUsers.fulfilled, (state, action) => {
      userSlice.caseReducers.addUsers(state, action);
      state.loading = false;
    });
    builder.addCase(handleFetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleFetchUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleCreateUser.fulfilled, (state, action) => {
      userSlice.caseReducers.addUser(state, action);
      state.loading = false;
    });
    builder.addCase(handleCreateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleCreateUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleDeleteUser.fulfilled, (state, action) => {
      userSlice.caseReducers.deleteUser(state, action);
      state.loading = false;
    });
    builder.addCase(handleDeleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(handleDeleteUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
