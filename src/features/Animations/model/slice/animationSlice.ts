import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimationSchema } from "../types/animationSchema";

const initialState: AnimationSchema = {
    src: ""
};

export const animationSlice = createSlice({
    name: "animation",
    initialState,
    reducers: {
        setSrc: (state, action: PayloadAction<string>) => {
            state.src = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { actions: animationActions } = animationSlice;
export const { reducer: animationReducer } = animationSlice;
