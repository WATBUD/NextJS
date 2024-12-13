"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";

export default function Home() {
  return (
    <>
      <GoogleAd
        adClient="ca-pub-5036446798216533" 
        adSlot="4679744551" 
      />
      <LanguagePracticeRedux />
    </>
  );
}
