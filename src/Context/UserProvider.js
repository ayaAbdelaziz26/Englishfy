import { useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
  const [showRoadmap, setShowRoadmap] = useState(true);

  return (
    <UserContext.Provider value={{ showRoadmap, setShowRoadmap }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;