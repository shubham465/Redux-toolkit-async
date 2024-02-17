import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    return res?.json();
 });

 const todoSlice = createSlice({
    name: "todo",
    initialState: {
     isLoading: false,
     data: [],
     isError: false
    },
    extraReducers: (builder) => {
     builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
     })
     builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
     })
     builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isError = true;
     })
    }
   });

   export const store = configureStore({
    reducer: {
      data: todoSlice.reducer
    }
   });

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.data);
 
    console.log("state", state);
    return (
   <div className="App">
    
     <button onClick={(e) => dispatch(fetchTodos())}>Click</button>
     <br/>
     {state?.isLoading && <><b>Loading...</b></>}
     {state?.data?.map((i, index) =>  (
    <li key={index}>{i.title}</li>
     ))}
   </div>
    );
  }
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <App />
    </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
