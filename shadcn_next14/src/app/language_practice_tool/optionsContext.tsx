"use client"

// OptionsContext.tsx
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';

import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

// 定義 Context
type OptionsContextType = {
  // 定義你的 options 和 setOptions
  showFavoritesListOnly: boolean;
  setShowFavoritesListOnly: React.Dispatch<React.SetStateAction<boolean>>;
  showOptionUI: boolean;
  setShowOptionUI: React.Dispatch<React.SetStateAction<boolean>>;
  copyTheTextBelow: boolean; 
  setCopyTheTextBelow: React.Dispatch<React.SetStateAction<boolean>>;
  copyTheTextAbove: boolean; 
  setCopyTheTextAbove: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: number[]; 
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  //setOptionsState: React.Dispatch<React.SetStateAction<Object>>;
};
interface OptionsState {
  showOptionUI: boolean;
  // 其他属性
}
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



// 創建 Context
const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

// 提供 Context 的 Component
export const OptionsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [showFavoritesListOnly, setShowFavoritesListOnly] = useState<boolean>(false);
  const [showOptionUI, setShowOptionUI] = useState<boolean>(false);
  const [copyTheTextBelow, setCopyTheTextBelow] = useState<boolean>(true); 
  const [copyTheTextAbove, setCopyTheTextAbove] = useState<boolean>(true); 
  const [favorites, setFavorites] = useState<number[]>([]);

  // const [optionsState, setOptionsState] = useState<OptionsContextType>({ 
  //   showOpionUI: false ,
  //   showFavoritesListOnly: false ,
  // });
 
  
  return (
    <OptionsContext.Provider value={{ 
      showFavoritesListOnly, setShowFavoritesListOnly,
      showOptionUI, setShowOptionUI, 
      copyTheTextAbove, setCopyTheTextAbove,
      copyTheTextBelow, setCopyTheTextBelow,
      favorites, setFavorites,
      }}>
      {children}
    </OptionsContext.Provider>
  );
};

// 自定義 hook 來使用 Context
export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};
