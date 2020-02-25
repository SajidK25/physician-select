import React, { useState, useEffect, useContext, createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    physician {
      id
      email
      firstName
      lastName
    }
  }
`;

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProviderAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components
export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return user;
  };

  const logout = () => {
    return true;
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    login,
    logout
  };
}
