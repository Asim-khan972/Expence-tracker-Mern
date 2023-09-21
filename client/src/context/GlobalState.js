import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [], 
  error : null, 
  loading : true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions(){
    try {
          const res = await axios.get("/api/v/transaction")
          dispatch({
            type :"GET_TRANSACTION" , 
            payload: res.data.data 
          })

    } catch (err) {
       dispatch({
            type :"TRANSACTION_ERROR" , 
            payload: err.response.data.error
          })
      
    }
  }
  async function deleteTransaction(id){
    try {
          const res = await axios.delete(`/api/v/transaction/${id}`)
          dispatch({
            type :"DELETE_TRANSACTION" , 
            payload: id
          })

    } catch (err) {
       dispatch({
            type :"TRANSACTION_ERROR" , 
            payload: err.response.data.error
          })
      
    }
  }

  async function addTransaction(transaction){
    console.log(transaction)
    const config ={
      Headers : {
        "Content-Type":"application/json"
      }
    }
    try {
          const res = await axios.post(`/api/v/transaction`, transaction , config)
          dispatch({
            type :"ADD_TRANSACTION" , 
            payload: res.data.data
          })
          console.log(res.data.data)

    } catch (err) {
       dispatch({
            type :"TRANSACTION_ERROR" , 
            payload: err.response.data.error
          })
      
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction ,
    getTransactions, 
    error : state.error , 
    loading : state.loading
  }}>
    {children}
  </GlobalContext.Provider>);
}