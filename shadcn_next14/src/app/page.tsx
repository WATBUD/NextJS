"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <>
      {/* <GoogleAd
        adClient="ca-pub-5036446798216533" 
        adSlot="4679744551" 
        adStyle={{
          //width:"720px",
          //height:"90px",
          //height: height, // You can adjust this value to your needs
          //display: "block",
        }}
        /> */}
      <LanguagePracticeRedux />
    </>
  );
}
