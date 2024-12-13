"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
import { useState, useEffect } from 'react';

export default function Home() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Only run on the client side
    const handleResize = () => {
      setHeight(window.innerHeight * 0.08); // 10% of the screen height
    };

    // Set initial height
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <GoogleAd
        adClient="ca-pub-5036446798216533" 
        adSlot="5708359962" 
        adStyle={{
          display:"inline-block",
          width:"720px",
          //height:"90px",
          //height: height, // You can adjust this value to your needs
          overflow: 'hidden', // To hide anything exceeding maxHeight
          //display: "block",
        }}
        />
      <LanguagePracticeRedux />
    </>
  );
}
