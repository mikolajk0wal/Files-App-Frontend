import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import UIProvider from './UIContext';

const TestingProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <UIProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </UIProvider>
    </Provider>
  );
};

export default TestingProvider;
