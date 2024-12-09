"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
export default function Home() {
  return (
    <>
      <LanguagePracticeRedux />
      <GoogleAd
        adClient="ca-pub-5036446798216533" 
        adSlot="8349991289" 
        adStyle={{ display: "block", margin: "20px auto", textAlign: "center" }}
      />
    </>
  );
}
