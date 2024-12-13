import { useEffect, useState } from 'react';
import Script from 'next/script';

type GoogleAdProps = {
  adClient: string;
  adSlot: string;
  adStyle?: React.CSSProperties;
};

const GoogleAd: React.FC<GoogleAdProps> = ({ adClient, adSlot, adStyle }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

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
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{
          display: isAdLoaded ? 'block' : 'inline-block', // 載入前使用 inline-block 確保尺寸計算
          visibility: isAdLoaded ? 'visible' : 'hidden', // 隱藏內容但保留尺寸
          width: '100%', // 確保有足夠的寬度可供計算
          //height: isAdLoaded ? '90px':'0px', 
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
