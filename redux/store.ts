import { configureStore } from "@reduxjs/toolkit";
import mentors from "./reducers/mentors";



export const store = configureStore({
	reducer: {
		mentors: mentors,
	}
})




