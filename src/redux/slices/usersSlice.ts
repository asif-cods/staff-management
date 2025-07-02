import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";




// difining interface 
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  eyeColor: string;
  bloodGroup: string;
  university: string;
  company: {
    department: string;
    title: string;
  };
  address: {
    city: string;
    state: string;
  };
  image: string;
}


// difining interface for user(type), here we get array of users 
interface UsersState {
  users: IUser[];
}

//This is slice initial state
const initialState: UsersState= {
    users: [],
}


//create slice
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        //reducers fuc
        setUsers: (state, action:  PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        addUser: (state, action: PayloadAction<IUser>) =>{
            state.users.push(action.payload); //push the new data inside state
        },
        updateUser: (state, action: PayloadAction<IUser>) =>{
            const index = state.users.findIndex(u => u.id === action.payload.id);
            if (index !== -1) state.users[index] = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
    },
    },
});

export const { setUsers, addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;