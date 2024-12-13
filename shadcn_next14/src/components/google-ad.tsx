import { useEffect, useState } from 'react';
import Script from 'next/script';

type GoogleAdProps = {
  adClient: string;
  adSlot: string;
  adStyle?: React.CSSProperties;
};

const GoogleAd: React.FC<GoogleAdProps> = ({ adClient, adSlot, adStyle }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(false);

  useEffect(() => {
    const adContainer = document.querySelector('.adsbygoogle');
    if (!adContainer || adContainer.hasAttribute('data-adsbygoogle-status')) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }

    const observer = new MutationObserver(() => {
      const status = adContainer.getAttribute('data-adsbygoogle-status');
      if (status === 'done') {
        setIsAdVisible(true);
      }
    });

    //observer.observe(adContainer, { childList: true, subtree: true });
    observer.observe(adContainer, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {isAdVisible && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: '100px', // 測試高度
            backgroundColor: '#f4f4f4', // 預設背景以區分是否有內容
            ...adStyle,
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
      {!isAdVisible && <div className='text-center'>No Ads Available</div>}
    </>
  );
};

export default GoogleAd;
