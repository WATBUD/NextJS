/* eslint-disable react-hooks/exhaustive-deps */

// "use client"
import { useEffect, useState } from 'react';
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';
export const showCustomToast = (text: string) => {
  toast(text, {
    duration: 900,
    position: 'top-center',
    //style: { textAlign: 'center' },
    className: '',
    // Custom Icon
    icon: '❤️',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });
};
export function translateTextAndSpeak(text: string='') {
  console.log(`enter translateTextAndSpeak ${text}`);
  const utterance_input = new SpeechSynthesisUtterance(text);
  //const utterance_input = new SpeechSynthesisUtterance(`You pressed ${text}`);
  utterance_input.lang = "en-US";
  utterance_input.volume = 1;
  //const synth = window.speechSynthesis;
  let voices = speechSynthesis.getVoices();
  //console.log(`voices ${JSON.stringify(voices)}`);
  console.dir(voices);
  if(voices[2]){
    utterance_input.voice = voices[1];
  }
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance_input);
}

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkMobile(); // 初次檢查
    window.addEventListener('resize', checkMobile); // 監聽視窗大小變化

    return () => {
      window.removeEventListener('resize', checkMobile); // 清理監聽器
    };
  }, []);

  console.log(
    "%c sharedFunction useIsMobile",
    "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
    "isMobile",
    isMobile
  );
  return isMobile;
};



