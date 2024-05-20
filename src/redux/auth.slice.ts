import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api';

interface AuthState {
  token: string;
  userName: string | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
}

const initialState: AuthState = {
  token: '',
  userName: null,
  error: null,
  status: 'idle', 
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await register(email, password);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = '';
      state.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ token: string, userName: string }>) => {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to login';
        state.status = 'failed';
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<{ token: string, userName: string }>) => {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to register';
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
