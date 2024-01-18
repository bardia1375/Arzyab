import React, { createContext, useReducer } from "react";

// Your initial state or any reducers can be added here
const initialState = {
    showNavigation:false,
    

};
// Define  reducer function
const appReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SHOW_NAVIGATION':
        return {
          ...state,
          showNavigation: action.payload,
        };
      default:
        return state;
    }
  };
  
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Define any actions you want to dispatch

  const setShowNavigation=(isShowNavigation)=>{
      dispatch({type:"SET_SHOW_NAVIGATION",payload:isShowNavigation})
  }
    // Provide the state and actions to the components
    const contextValue = {
        state,
        setShowNavigation
      };
  return (
    <AppContext.Provider value={{contextValue}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
