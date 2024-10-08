/* eslint-disable react-hooks/exhaustive-deps */
"use client"

// OptionsContext.tsx
import { set_indexedDB_Data, get_indexedDB_data } from "../common/indexedDBUtils";

import React, { createContext, useContext, useState,useEffect, PropsWithChildren } from 'react';

type OptionsContextType = {
  databaseHasBeenLoaded: boolean;
  setDatabaseHasBeenLoaded: React.Dispatch<React.SetStateAction<boolean>>;
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





const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [showOptionUI, setShowOptionUI] = useState<boolean>(false);
  const [databaseHasBeenLoaded, setDatabaseHasBeenLoaded] = useState<boolean>(false);
  const [configOptions, setConfigOptions] = useState({
    copyTheTextBelow: true,
    copyTheTextAbove: true,
    showFavoritesListOnly:false,
  });
  const [favorites, setFavorites] = useState<number[]>([]);
 
  useEffect(() => {
    console.log(
      "%c optionsContext+useEffect+showFavoritesListOnly",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold"
    );
    //localStorage.setItem('favorites', JSON.stringify(favorites));
    if (databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "configOptions", configOptions, () => {});
    }
  }, [configOptions]);

  useEffect(() => {
    if (databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "data", favorites, () => {});
    } 
  }, [favorites]);




  return (
    <OptionsContext.Provider value={{ 
      showOptionUI, setShowOptionUI, 
      favorites, setFavorites,
      configOptions,setConfigOptions,
      databaseHasBeenLoaded,setDatabaseHasBeenLoaded,
      }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};
