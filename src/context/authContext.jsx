/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer } from 'react';

export const authContext = createContext();

// export auth reducer function
export const authReducer = (state, action) => {
   switch (action.type) {
      case 'REGISTER':
         return {
            user: action.payload,
         };
      case 'LOGIN':
         return {
            user: action.payload,
         };
      case 'LOGOUT':
         return {
            user: action.payload,
         };
      default:
         return state;
   }
};

// export authContext provider
export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user: null });

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
         dispatch({ type: 'REGISTER', payload: user });
      }
   }, []);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
         dispatch({ type: 'LOGIN', payload: user });
      }
   }, []);

   return (
      <authContext.Provider value={{ ...state, dispatch }}>
         {children}
      </authContext.Provider>
   );
};
