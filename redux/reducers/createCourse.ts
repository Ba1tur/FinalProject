import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface CourseData {
  title: string;
  description: string;
  mentorId: number;
}

export const createCourse = createAsyncThunk(
  'course/create',
  async (courseData: CourseData, { rejectWithValue }) => {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token") as string)
        }
      }
      const response = await axios.post(
        'https://localhost:7090/Course/Create',
        courseData,
        config
      );

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

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const courseActions = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
