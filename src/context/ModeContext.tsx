/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModeContextProps {
  mode: boolean;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextProps>({
  mode: false,
  toggleMode: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export const useMode = () => useContext(ModeContext);

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState(false);
  useEffect(() => {
    const fetchMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('Mode');
        if (storedMode !== null) {
          setMode(JSON.parse(storedMode));
        }
      } catch (error) {
        console.log('Error fetching  mode state: ', error);
      }
    };

    fetchMode();
  }, []);

  const toggleMode = () => {
    const newMode = !mode;
    setMode(newMode);

    AsyncStorage.setItem('Mode', JSON.stringify(newMode))
      .then(() => {
        console.log(' mode state saved successfully.');
      })
      .catch((error) => {
        console.log('Error saving mode state: ', error);
      });
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
