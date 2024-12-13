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
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // 假設 768px 以下為行動裝置
      setIsAdVisible(isMobile); // 只在行動裝置上顯示廣告
      setHeight(isMobile ? window.innerHeight * 0.08 : 0); // 行動裝置廣告高度為螢幕的 8%
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
      const status = adContainer.getAttribute('data-adsbygoogle-status');
      setTimeout(() => {
        if (status === 'done') {
          setIsAdVisible(true);
        }
      }, 1500);

    });

    observer.observe(adContainer, { childList: true, subtree: true });
    // observer.observe(adContainer, { attributes: true });

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
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            overflow: 'hidden',
            width: '100%',
            height: isAdVisible?height:'0px', 
            maxHeight: isAdVisible?height:'0px', 
            backgroundColor: '#0000', 
            ...adStyle,
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      {/* {!isAdVisible && <div className='text-center'>No Ads Available</div>} */}
    </>
  );
};

export default GoogleAd;
