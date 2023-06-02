import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Создаем асинхронное действие с помощью createAsyncThunk
export const getMentors = createAsyncThunk(
  'mentors/getMentors',
  async (_, { rejectedWithValue } : any) => {
    try {
      const res = await axios.get("http://localhost:7090/Admin/getAllMentors/");

      if (res.statusText !== 'OK') {
        throw new Error("Произошла ошибка");
      }
      return res.data;
    } catch (err) {
      // Возвращаем отклоненное значение с ошибкой
      console.log(rejectedWithValue((err as AxiosError).message));
      throw err;
    }
  }
);

// Определяем тип состояния
interface MentorState {
  mentors: any[]; // Замените any на тип, соответствующий структуре данных продуктов
  error: boolean;
  loading: boolean;
}

// Устанавливаем начальное состояние
const initialState: MentorState = {
  mentors: [],
  error: false,
  loading: false
};

const mentorSlice = createSlice({
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
      .addCase(getMentors.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.mentors = action.payload;
        state.loading = false;
        state.error = false;
      });
  }
});

// Экспортируем редьюсер
export default mentorSlice.reducer;

