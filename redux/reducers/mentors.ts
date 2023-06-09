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

export const getMentors = createAsyncThunk(
  "mentors/getMentors",
  async (_, { rejectedWithValue }) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const res = await axios.get(
        "https://localhost:7090/Admin/getAllMentors",
        config
      );

      console.log(res);
      if (res.statusText !== "OK") {
        throw new Error("Произошла ошибка");
      }
      return res.data.data.mentors as Mentor[];
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

const mentorsSlice = createSlice({
  name: "mentors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMentors.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMentors.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(
        getMentors.fulfilled,
        (state, action: PayloadAction<Mentor[]>) => {
          state.mentors = action.payload;
          state.loading = false;
          state.error = false;
        }
      );
  },
});

export default mentorsSlice.reducer;
