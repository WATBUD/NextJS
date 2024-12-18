"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
import GoogleAdPC from "@/components/google-ad-pc";

import {useIsMobile} from './common/sharedFunction';

export default function Home() {
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            backgroundColor: '#0000',
            zIndex: 9999,
            // bottom: "0",
            // left: "0",
            // width: "100%",
            height: "100%",
          }}
        >
          <GoogleAdPC adClient="ca-pub-5036446798216533" adSlot="2939969664" />
        </div>
      )}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            backgroundColor: '#0000',
            zIndex: 9999,
            right: "0",
            // bottom: "0",
            // left: "0",
            // width: "100%",
            height: "100%",
          }}
        >
          <GoogleAdPC adClient="ca-pub-5036446798216533" adSlot="2939969664" />
        </div>
      )}
      <LanguagePracticeRedux />
      <GoogleAd adClient="ca-pub-5036446798216533" adSlot="4679744551" />

    </>
  );
}
