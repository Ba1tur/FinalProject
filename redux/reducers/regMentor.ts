import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface RegistrationUser {
  userName: string;
  email: string;
  passwordHash: string;
  jobTitle: string;
  experience: string;
  education: string;
}

interface RegistrationResponse {
  message: string;
  // Другие поля, если таковые есть в ответе сервера
}

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData: RegistrationUser, { rejectWithValue }) => {
    try {
      const response = await axios.post<RegistrationResponse>('https://localhost:7090/Account/register', userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    data: null as RegistrationResponse | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const registrationActions = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
