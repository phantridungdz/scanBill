import React from 'react';
import NavigationStack from './navigation';
import { ModeProvider } from './src/context/ModeContext';

const App = () => {
  return (
    <ModeProvider>
      <NavigationStack />
    </ModeProvider>
  );
};

export default App;
