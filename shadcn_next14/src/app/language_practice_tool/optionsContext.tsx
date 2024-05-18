"use client"

// OptionsContext.tsx
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';

import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

type OptionsContextType = {
  showOptionUI: boolean;
  setShowOptionUI: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: number[]; 
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  configOptions: {
    copyTheTextBelow: boolean;
    copyTheTextAbove: boolean;
    showFavoritesListOnly: boolean;
  };
  setConfigOptions: React.Dispatch<React.SetStateAction<{
    copyTheTextBelow: boolean;
    copyTheTextAbove: boolean;
    showFavoritesListOnly: boolean;
  }>>;
};

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



const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [showOptionUI, setShowOptionUI] = useState<boolean>(false);
  const [configOptions, setConfigOptions] = useState({
    copyTheTextBelow: true,
    copyTheTextAbove: true,
    showFavoritesListOnly:false,
  });
  const [favorites, setFavorites] = useState<number[]>([]);
 
  
  return (
    <OptionsContext.Provider value={{ 
      showOptionUI, setShowOptionUI, 
      favorites, setFavorites,
      configOptions,setConfigOptions,
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
