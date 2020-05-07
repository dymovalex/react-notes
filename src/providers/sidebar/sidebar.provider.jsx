import React, { useState, createContext } from 'react';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [sidebarIsClosed, setSidebarIsClose] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsClose(!sidebarIsClosed);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarIsClosed,
        toggleSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;