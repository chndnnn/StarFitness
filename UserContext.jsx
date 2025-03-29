import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [toggle, setToggle] = useState(false);

  return (
    <UserContext.Provider value={{ toggle,setToggle}}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};
