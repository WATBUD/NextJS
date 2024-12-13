import { useEffect, useState } from 'react';
import Script from 'next/script';

type GoogleAdProps = {
  adClient: string;
  adSlot: string;
  adStyle?: React.CSSProperties;
};

const GoogleAd: React.FC<GoogleAdProps> = ({ adClient, adSlot, adStyle }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
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
  useEffect(() => {
    const adContainer = document.querySelector('.adsbygoogle');
    if (!adContainer || adContainer.hasAttribute('data-adsbygoogle-status')) {
      return; // 如果廣告已初始化，直接返回
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }

    const observer = new MutationObserver(() => {
      const adContent = adContainer.querySelector('iframe');
      if (adContent) {
        setIsAdLoaded(true);
      }
    });

    observer.observe(adContainer, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
       //strategy="afterInteractive"
        strategy="lazyOnload"
      />
      <ins
        className="adsbygoogle"
        style={{
          maxWidth:"100%",
          overflow: 'hidden', // To hide anything exceeding maxHeight
          // position: 'absolute',
          // zIndex: 100,
          display: 'block',
          //position: "fixed",
          width: "100%",
          ///maxHeight: 90,
          // display: isAdLoaded ? 'inline-block' : 'inline-block', // 載入前使用 inline-block 確保尺寸計算
          //visibility: isAdLoaded ? 'visible' : 'hidden', // 隱藏內容但保留尺寸
          //height: isAdLoaded ? 0px:'0px', 
          maxHeight: isAdLoaded ? height:'0px', 
          // margin: "0",
          // textAlign: "center",
          backgroundColor: '#0000',
          ...adStyle,
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  );
};

export default GoogleAd;
