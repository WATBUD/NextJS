"use client";
import LanguagePracticeRedux from "../app/language-practice-redux/page";
import GoogleAd from "@/components/google-ad";
import GoogleAdPC from "@/components/google-ad-pc";
import Script from 'next/script';

import {useIsMobile} from './common/sharedFunction';

export default function Home() {
  const isMobile = useIsMobile();
  const adClient = "ca-pub-5036446798216533";
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div
          style={{
            position: "fixed",
            display: 'flex',
            backgroundColor: '#0000',
            zIndex: 111,
            overflow: 'hidden',
            bottom: "0",
            justifyContent:"center",
            alignItems: "center",
            width: "100%",
            height: '45px', 
            maxHeight: '45px', 
          }}
      >
      <GoogleAd adClient={adClient} adSlot="4679744551" />
      </div>
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "#0000",
            zIndex: 9999,
            left: "0",
          }}
        >
          <GoogleAdPC
            adClient={adClient}
            adStyle={{
              width: "120px",
              height: "1200px",
              maxHeight: '100%',
            }}
            adSlot="2939969664"
          />{" "}
        </div>
      )}
      {/* {!isMobile && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "#0000",
            zIndex: 9999,
            right: "0",
          }}
        >
          <GoogleAdPC
            adClient={adClient}
            adStyle={{
              width: "120px",
              height: "1200px",
              maxHeight: '100%',
            }}
            adSlot="2939969664"
          />
        </div>
      )} */}
      <LanguagePracticeRedux />
      {/* {!isMobile && (
        <div
          style={{
            position: "fixed",
            display: 'flex',
            backgroundColor: '#0000',
            zIndex: 9999,
            bottom: "0",
            justifyContent  : "center",
            alignItems: "center",
            width: "100%",
            height: '45px', 
            maxHeight: '45px', 
          }}
        >
          <GoogleAdPC adClient={adClient} adStyle={{
            width: '728px',
            height: '45px', 
            maxHeight: '45px', 
            }} adSlot="1239843369" />
        </div>
      )} */}
    </>
  );
}
