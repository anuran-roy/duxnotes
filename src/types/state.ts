import { Note } from "./note";


export default interface State {
    notes: Note[];
    username?: string;
}