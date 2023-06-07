// createCourse.ts

import { createSlice, createAsyncThunk, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface CourseData {
  categoryId: number;
  title: string;
  description: string;
  mentorId: number;
  formFile: File | null;
}

interface CourseResponse {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  id: number;
  dateTimeAdded: string;
  dateTimeUpdated: string;
  categoryId: number;
  imageCourseName: string;
  imageCourseUrl: string;
  title: string;
  description: string;
  mentorId: number;
}

export const createCourse = createAsyncThunk<CourseResponse, CourseData>(
  'course/create',
  async (courseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("categoryId", courseData.categoryId.toString());
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("mentorId", courseData.mentorId.toString());
      if (courseData.formFile) {
        formData.append("formFile", courseData.formFile);
      }

      const response = await axios.post<CourseResponse>('https://localhost:7090/Course/Create', formData, {
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token") as string),
          'Content-Type': 'multipart/form-data',
        },
      });

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

interface CourseState {
  data: CourseResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  data: null,
  loading: false,
  error: null,
};

const rejectedCaseReducer: CaseReducer<CourseState, PayloadAction<AsyncThunkRejectedAction<CourseResponse, CourseData, any>>> = (state, action) => {
  state.loading = false;
  state.error = action.error?.message || 'Something went wrong';
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<CourseResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCourse.rejected, rejectedCaseReducer);
  },
});

export const courseActions = courseSlice.actions;
export const courseReducer = courseSlice.reducer;