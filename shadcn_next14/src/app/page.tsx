"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
import GoogleAdPC from "@/components/google-ad-pc";

import {useIsMobile} from './common/sharedFunction';

export default function Home() {
  const isMobile = useIsMobile();
  return (
    <>
      <GoogleAd adClient="ca-pub-5036446798216533" adSlot="4679744551" />
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            backgroundColor: '#f00',
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
    </>
  );
}
