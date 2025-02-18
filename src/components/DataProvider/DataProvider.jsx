import React,{createContext, useReducer} from 'react'
// import { useReducer } from "react";

export const DataContext = createContext()


function DataProvider({ children, reducer, initialState }) {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
}

// const [state, dispatch] = useReducer(reducer, initialState);

export default DataProvider