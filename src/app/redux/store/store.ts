import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/userSlice/userSlice";
import penguinsReducer from "../features/penguinSlice/penguinSlice";
import messagesReducer from "../features/messageSlice/messageSlice";
import uiReducer from "../features/uiSlice/uiSlice";
import systemReducer from "../features/systemSlice/systemSlice";

const store = configureStore({
  reducer: {
    user: usersReducer,
    penguins: penguinsReducer,
    messages: messagesReducer,
    ui: uiReducer,
    system: systemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
