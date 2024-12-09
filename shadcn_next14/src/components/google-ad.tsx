import { useEffect, useState } from 'react';
import Script from 'next/script';

type GoogleAdProps = {
  adClient: string;
  adSlot: string;
  adStyle?: React.CSSProperties;
};

const GoogleAd: React.FC<GoogleAdProps> = ({ adClient, adSlot, adStyle }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false); // State to track if the ad is loaded

  useEffect(() => {
    // Initialize Google AdSense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense initialization error:", e); // Log any initialization errors
    }

    // Use MutationObserver to detect changes in the ad container
    const adContainer = document.querySelector('.adsbygoogle');
    if (adContainer) {
      const observer = new MutationObserver(() => {
        // Check if the ad content has loaded (typically an iframe is added to the container)
        const adContent = adContainer.querySelector('iframe');
        if (adContent) {
          setIsAdLoaded(true); // Set state to true when ad is loaded
        }
      });

      // Start observing changes in the ad container
      observer.observe(adContainer, {
        childList: true, // Observe changes to child elements
        subtree: true, // Observe changes to all descendant elements
      });

      // Clean up the observer when the component is unmounted
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <>
      {/* Load Google Ads script asynchronously */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* Conditionally render ad content based on whether it's loaded */}
      {isAdLoaded ? (
        <ins
          className="adsbygoogle"
          style={adStyle || { display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : 
      //null
      (
        <div
        style={{
          width: '100%', // Set width to 100%
          textAlign: 'center', // Center the content horizontally
          margin: '0 auto', // Center the div within its parent
        }}
      >
        Loading ad...
      </div>
      )
      
      }
    </>
  );
};

export default GoogleAd;
