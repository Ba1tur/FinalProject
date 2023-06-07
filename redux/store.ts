import { configureStore } from "@reduxjs/toolkit";
// import { courseReducer } from "./reducers/createCourse";
import { registrationReducer } from "./reducers/regMentor";
import mentorsReducer from "./reducers/mentors";
import mentors from "./reducers/mentors";
import subscriptionsReducer from "./reducers/subscriptions";
import subscriptions from "./reducers/subscriptions";
import { courseReducer } from "./reducers/createCourse";

export const store = configureStore({
  reducer: {
    mentors: mentorsReducer,
    courseReducer,
    subscription: subscriptions,
    registration: registrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
