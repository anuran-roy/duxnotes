import { createStore } from "@reduxjs/toolkit";

// Notes Schema
// 

const reducer = (state = { value: 0 }, action: any) => {
    switch (action.type) {
        case "increment":
        return {
            value: state.value + 1,
        };
        case "decrement":
        return {
            value: state.value - 1,
        };
        default:
        return state;
    }
    }