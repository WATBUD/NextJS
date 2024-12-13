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
      const adIframe = adContainer.querySelector('iframe');
      if (adIframe) {
        setIsAdLoaded(true);
      
        console.log(
          "%c MutationObserver+adIframe",
          "color:#003Dff;font-family:system-ui;font-size:2rem;font-weight:bold",
          "adIframe:",
          adIframe,
          // "adIframe.clientHeight",
          // adIframe.clientHeight,
        );
        // 檢查 iframe 是否顯示內容
        setTimeout(() => {
          const iframeDoc = adIframe?.contentDocument || adIframe?.contentWindow?.document;
          const hasAdContent = (iframeDoc?.body?.innerHTML?.trim().length ?? 0) > 0
          if (hasAdContent) {
            setIsAdVisible(true);
          } else {
            console.warn('AdSense iframe is empty.');
            setIsAdVisible(false);
          }
        }, 2000); // 延遲檢查
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
      {/* {!isAdVisible && <div>目前無法載入廣告，請稍後再試。</div>} */}
    </>
  );
};

export default GoogleAd;
