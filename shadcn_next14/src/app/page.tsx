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
            backgroundColor: '#0000',
            zIndex: 9999,
            // bottom: "0",
            // left: "0",
            // width: "100%",
            height: "100%",
          }}
        >
          <GoogleAdPC adClient="ca-pub-5036446798216533" adStyle={{
            width: '120px',
            height: '720px', 
            maxHeight: '100%', 
            }} adSlot="2939969664" />        </div>
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
          <GoogleAdPC adClient="ca-pub-5036446798216533" adStyle={{
            width: '120px',
            height: '720px', 
            maxHeight: '100%', 
            }} adSlot="2939969664" />
        </div>
      )}
      <LanguagePracticeRedux />
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            display: 'flex',
            backgroundColor: '#0000',
            zIndex: 9999,
            bottom: "0",
            // left: "0",
            // flexDirection: "row",
            justifyContent  : "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <GoogleAdPC adClient="ca-pub-5036446798216533" adStyle={{
            width: '728px',
            height: '90px', 
            maxHeight: '100%', 
            }} adSlot="1239843369" />
        </div>
      )}

    </>
  );
}
