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
      {/* <GoogleAdPC
          adClient={adClient}
          adStyle={{
            position: "fixed",
            backgroundColor: "#0000",
            zIndex: 9999,
            bottom: "0",
            width: "980px",
            height: "50px",
            maxHeight: "50px",
          }}
          adSlot="4767523822"
      /> */}
      <div
        style={{
          position: "fixed",
          display: "flex",
          backgroundColor: "#0000",
          zIndex: 9999,
          overflow: "hidden",
          marginTop:  isMobile ? "85vh" : "80vh",
          //bottom: 0,
          // bottom: isMobile ? "-30vh" : "-20vh",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <GoogleAd
          isMobile={isMobile}
          adClient={adClient}
          adStyle={{
            width: "1200px",
            height: "50px",
            maxWidth: '980px',
          }}
          adSlot="1239843369"
        />
      </div>
      {!isMobile && (
        <GoogleAdPC
          adClient={adClient}
          adStyle={{
            position: "fixed",
            backgroundColor: "#0000",
            zIndex: 9999,
            left: "0",
            width: "120px",
            height: "1200px",
            maxHeight: "100%",
          }}
          adSlot="2939969664"
        />
      )}
      {!isMobile && (
        <GoogleAdPC
          adClient={adClient}
          adStyle={{
            position: "fixed",
            backgroundColor: "#0000",
            zIndex: 9999,
            right: "0",
            width: "120px",
            height: "1200px",
            maxHeight: "100%",
          }}
          adSlot="8132887911"
        />
      )}
      <LanguagePracticeRedux />
    </>
  );
}
