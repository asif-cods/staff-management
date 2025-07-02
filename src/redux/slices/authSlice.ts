import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";  //Using import type tells TypeScript: “Only use this at compile-time, not runtime.”

interface IAuthState {
    isLoggedIn: boolean,
    userName: string
}

interface ILoginPayload{
    userName: string,
    password: string
}

//initial state
const initialState: IAuthState = {
    isLoggedIn: false,  //make it false
    userName: ''
};

// valid credentials, for login check
const ValidData = {
  username: "admin",
  password: "admin123",
};

//create slice
export const authSlice = createSlice({
    name:'auth', //silce uique name,
    initialState,
    reducers:{
        login: (state, action:  PayloadAction<ILoginPayload>)=>{  //PayloadAction<T> is a helper type from Redux Toolkit that:, Defines the shape of the action object passed into a reducer.Automatically gives you action.payload of type T.
            const {userName, password} = action.payload; // destructure from action.payload, this data come when login data pass in dipatch()
            if (userName === ValidData.username && password === ValidData.password){
                state.isLoggedIn = true;
                state.userName = userName;
                // navigator
            }

        },
        logout: (state, action:  PayloadAction<string>)=>{
            state.isLoggedIn = false; //make it false
            state.userName = action.payload;
        },
    }
});

//create actions
export const {login, logout} = authSlice.actions;

//export all reducer as single reducer name
export default authSlice.reducer;