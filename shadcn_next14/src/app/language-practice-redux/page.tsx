"use client"; // This marks the component as a client component
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import SearchList from './searchList';
import GoogleAd from "@/components/google-ad";
const LanguagePracticeRedux = () => {
  return (
    <Provider store={store}>
      <SearchList />
      <GoogleAd
        adClient="ca-pub-5036446798216533" 
        adSlot="4679744551" 
        />

    </Provider>
  );
};

export default LanguagePracticeRedux;
