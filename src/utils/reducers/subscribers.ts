import reduxStore from "../redux/store";
import { writeNotesToLocalStorage } from "../utils";

reduxStore.subscribe(() => {
    const state = reduxStore.getState().notes;
    writeNotesToLocalStorage(state);
});