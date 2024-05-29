"use client";
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchList from './searchList';

const ClientApp: React.FC = () => {
  return (
    <Provider store={store}>
      <SearchList />
    </Provider>
  );
};

export default ClientApp;
