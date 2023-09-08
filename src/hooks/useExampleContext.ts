import {useContext} from 'react';
import {ExampleContext} from '../context/ExampleContextProvider'

export const useExampleContext = () => {
  const context = useContext(ExampleContext);

  if (context === null) {
    throw "'useExampleContext' cannot be used out of the RNDT!";
  }
  
  return context;
};