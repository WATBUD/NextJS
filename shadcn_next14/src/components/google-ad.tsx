import { useEffect, useState } from 'react';
import Script from 'next/script';

type GoogleAdProps = {
  adClient: string;
  adSlot: string;
  adStyle?: React.CSSProperties;
};

const GoogleAd: React.FC<GoogleAdProps> = ({ adClient, adSlot, adStyle }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdVisible, setIsAdVisible] = useState(false); // 新增狀態來控制區塊顯示
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight * 0.08); // 設置廣告高度為螢幕高度的 10%
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      const adIframe = adContainer.querySelector('iframe');
      if (adIframe) {
        setIsAdLoaded(true);

        // 檢查 iframe 是否有內容（高度不為 0）
        setTimeout(() => {
          const adHeight = adIframe.clientHeight || 0;
          if (adHeight > 0) {
            setIsAdVisible(true); // 顯示區塊
          } else {
            setIsAdVisible(false); // 隱藏區塊
          }
        }, 1000); // 延遲檢查避免初始化過早
      }
    });

    observer.observe(adContainer, { childList: true, subtree: true });
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
      {isAdVisible && ( // 根據 `isAdVisible` 狀態控制顯示
        <ins
          className="adsbygoogle"
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            display: 'block',
            width: '100%',
            maxHeight: isAdLoaded ? height : '0px',
            backgroundColor: '#0000',
            ...adStyle,
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </>
  );
};

export default GoogleAd;
