"use client"; // This marks the component as a client component
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchList from './searchList';
const LanguagePracticeRedux = () => {
  return (
    <Provider store={store}>
      <SearchList />
    </Provider>
  );
};

export default LanguagePracticeRedux;
