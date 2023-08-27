import { Note } from "./note";

export default interface Action {
    type: string,
    note?: Note,
    title?: string,
    content?: string,
}