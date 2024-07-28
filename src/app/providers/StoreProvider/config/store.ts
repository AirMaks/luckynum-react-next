import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createReducerManager } from "./reducerManager";
import { animationReducer } from "features/Animations/model/slice/animationSlice";

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) {
    const rootReducers: any = {
        ...asyncReducers,
        animation: animationReducer
    };
    const reducerManager = createReducerManager(rootReducers);
    const store = configureStore<any>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

const store = createReduxStore();
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
