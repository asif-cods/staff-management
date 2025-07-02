import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import alertReducer from "../slices/alertSlice"
import usersReducers from "../slices/usersSlice"

//create store
const store = configureStore({
    reducer: {
        auth: authReducer,  //authReducer this is the imported reducer
        alert: alertReducer,
        users: usersReducers,
    },
});

export type RootState = ReturnType<typeof store.getState>;
// This creates a type that represents your entire Redux state tree.
// store.getState() returns the full state (like { auth: { isLoggedIn: true, username: "admin" } }).
// ReturnType<typeof store.getState> automatically infers that structure and makes RootState strongly typed.

export type AppDispatch = typeof store.dispatch;
//  This is the type of your dispatch function.
// It's especially useful when using useDispatch() with TypeScript.


export default store;