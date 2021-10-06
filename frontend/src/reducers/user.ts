import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { User } from '../@types/User';
import userAPI, { CreateUserRequest } from '../api/user';

interface UserState {
  loading: boolean;
  users: { [id: string]: User };
  success: string;
  failed: string;
}

const initialState: UserState = {
  users: {},
  loading: false,
  success: '',
  failed: '',
};

interface AddUsersPayload {
  users?: User[];
  serverResponse?: AxiosResponse;
}

export interface AddUserPayload {
  user?: User;
  password?: string;
  serverResponse?: AxiosResponse;
}

interface DeleteUserPayload {
  userId?: string;
  serverResponse?: AxiosResponse;
}

export const handleFetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (): Promise<AddUsersPayload> => {
    try {
      const { data } = await userAPI.fetchUsers();
      return { users: data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError.response?.status && serverError.response?.data) {
          return {
            serverResponse: serverError.response,
          };
        }
      }
    }
    return {};
  },
);

export const handleCreateUser = createAsyncThunk(
  'users/createUser',
  async (userData: CreateUserRequest): Promise<AddUserPayload> => {
    try {
      const { data } = await userAPI.createUser(userData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response) {
          return {
            serverResponse: serverError.response,
          };
        }
      }
    }
    return {};
  },
);

export const handleDeleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string): Promise<DeleteUserPayload> => {
    try {
      await userAPI.deleteUser(userId);
      return { userId };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response) {
          return {
            serverResponse: serverError.response,
          };
        }
      }
    }
    return {};
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
      } else {
        state.failed = 'Something went wrong.';
      }
    },
    addUser: (state, { payload }: PayloadAction<AddUserPayload>) => {
      const { user, password, serverResponse } = payload;
      const { users } = state;
      if (user && password) {
        const newUserState = { [user.id]: user, ...users };
        state.users = newUserState;
        state.success = `User has been created. Please carefully save the password: ${password}`;
      } else if (serverResponse?.status !== 409) {
        state.failed = 'Something went wrong.';
      }
    },
    deleteUser: (state, { payload }: PayloadAction<DeleteUserPayload>) => {
      const { userId, serverResponse } = payload;
      if (userId) {
        const { users } = state;
        delete users[userId];
      } else if (serverResponse) {
        const { status } = serverResponse;
        if (status === 404) {
          state.failed = 'User not found.';
        }
      } else {
        state.failed = 'Something went wrong.';
      }
    },
    processing: (state) => {
      state.loading = true;
      state.success = '';
      state.failed = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchUsers.fulfilled, (state, action) => {
      userSlice.caseReducers.addUsers(state, action);
      state.loading = false;
    });
    builder.addCase(handleFetchUsers.pending, (state) => {
      userSlice.caseReducers.processing(state);
    });
    builder.addCase(handleFetchUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleCreateUser.fulfilled, (state, action) => {
      userSlice.caseReducers.addUser(state, action);
      state.loading = false;
    });
    builder.addCase(handleCreateUser.pending, (state) => {
      userSlice.caseReducers.processing(state);
    });
    builder.addCase(handleCreateUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(handleDeleteUser.fulfilled, (state, action) => {
      userSlice.caseReducers.deleteUser(state, action);
      state.loading = false;
    });
    builder.addCase(handleDeleteUser.pending, (state) => {
      userSlice.caseReducers.processing(state);
    });
    builder.addCase(handleDeleteUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
