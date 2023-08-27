// import { configureStore } from "@reduxjs/toolkit";
// import { defaultNewNote } from "../types/note";
// import { addItem } from "./reducers/actions";
import rootReducer from "./reducer";
import { createStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
import { writeNotesToLocalStorage } from "../utils";

// const reduxStore = configureStore({
//     reducer: {
//         counter: rootReducer
//     },
// });

const reduxStore = createStore(rootReducer);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

reduxStore.subscribe(() => {
    const state = reduxStore.getState().notes;
    console.log("Data present in Redux = ", state);
    writeNotesToLocalStorage(state);
});

export default reduxStore;