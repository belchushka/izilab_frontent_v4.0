import {Action, ActionCreator, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {analysisReducer, cartReducer, cityReducer, officeSReducer, promocodeReducer, userReducer} from "@box/entities";

const store = configureStore({
    reducer: {
        city: cityReducer,
        office: officeSReducer,
        analysis: analysisReducer,
        cart: cartReducer,
        user: userReducer,
        promocode: promocodeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkAction<RT = void> = ActionCreator<ThunkAction<RT, AppState, unknown, Action>>
export default store