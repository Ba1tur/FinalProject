import { configureStore } from "@reduxjs/toolkit";
import mentors from "./reducers/mentors";
import { courseReducer } from "./reducers/createCourse";



export const store = configureStore({
	reducer: {
		mentors: mentors,
		course: courseReducer,
	}
})