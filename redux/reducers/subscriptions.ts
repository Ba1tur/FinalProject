import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Mentor {
  dateTimeAdded: string;
  dateTimeUpdated: string;
  education: string;
  email: string;
  experience: string;
  id: number;
  isConfirmed: boolean;
  isDeleted: boolean;
  jobTitle: string;
  userName: string;
}

interface MentorsState {
  mentors: Mentor[];
  error: boolean;
  loading: boolean;
}

export const getSubscriptions = createAsyncThunk(
  "subscriptions/getSubscriptions",
  async (id: number, { rejectedWithValue }) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const res = await axios.get(
        `https://localhost:7090/Course/getStudentCourses/${id}`,
        config
      );

      console.log(res);
      if (res.statusText !== "OK") {
        throw new Error("Произошла ошибка");
      }
      return res.data.data.courses as any;
    } catch (err) {
      console.log(rejectedWithValue(err.message));
      throw err;
    }
  }
);

const initialState: MentorsState = {
  mentors: [],
  error: false,
  loading: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSubscriptions.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(
        getSubscriptions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.mentors = action.payload;
          state.loading = false;
          state.error = false;
        }
      );
  },
});

export default subscriptionSlice.reducer;