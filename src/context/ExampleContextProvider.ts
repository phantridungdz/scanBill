import {createContext} from 'react';
import {ExampleContextTypes} from './types.d';

export const ExampleContext = createContext<ExampleContextTypes | null>(null);

export const ExampleContextProvider = ExampleContext.Provider;
