/* eslint-disable react-hooks/exhaustive-deps */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from './store'; 
import { set_indexedDB_Data, get_indexedDB_data } from "../indexedDBUtils";

export interface OptionsState {
  showOptionUI: boolean;
  databaseHasBeenLoaded: boolean;
  configOptions: {
    copyTheTextBelow: boolean;
    copyTheTextAbove: boolean;
    showFavoritesListOnly: boolean;
  };
  favorites: number[];
}

const initialState: OptionsState = {
  showOptionUI: false,
  databaseHasBeenLoaded: false,
  configOptions: {
    copyTheTextBelow: true,
    copyTheTextAbove: true,
    showFavoritesListOnly: false,
  },
  favorites: [],
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setShowOptionUI(state, action: PayloadAction<boolean>) {
      state.showOptionUI = action.payload;
    },
    setDatabaseHasBeenLoaded(state, action: PayloadAction<boolean>) {
      state.databaseHasBeenLoaded = action.payload;
    },
    setConfigOptions(state, action: PayloadAction<OptionsState['configOptions']>) {
      state.configOptions = action.payload;
    },
    updateConfigOptions(state, action: PayloadAction<(prevOptions: OptionsState['configOptions']) => OptionsState['configOptions']>) {
      state.configOptions = action.payload(state.configOptions);
    },
    setFavorites(state, action: PayloadAction<number[]>) {
      state.favorites = action.payload;
    },
  },
});

export const { setShowOptionUI, setDatabaseHasBeenLoaded, setConfigOptions, updateConfigOptions, setFavorites } = optionsSlice.actions;
export default optionsSlice.reducer;

export const useOptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const optionsState = useSelector((state: RootState) => state.options);

  const dispatchSetShowOptionUI = (value: boolean) => {
    dispatch(setShowOptionUI(value));
  };

  const dispatchSetDatabaseHasBeenLoaded = (value: boolean) => {
    dispatch(setDatabaseHasBeenLoaded(value));
  };

  const dispatchSetConfigOptions = (configOptions: OptionsState['configOptions']) => {
    dispatch(setConfigOptions(configOptions));
  };


  const dispatchSetFavorites = (favorites: number[]) => {
    dispatch(setFavorites(favorites));
  };
  useEffect(() => {
    console.log(
      "%c optionsReducer+useEffect+showFavoritesListOnly",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold"
    );
    if (optionsState.databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "configOptions", optionsState.configOptions, () => {});
    }
  }, [optionsState.configOptions]);

  useEffect(() => {
    if (optionsState.databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "data", optionsState.favorites, () => {});
    } 
  }, [optionsState.favorites]);
  return {
    ...optionsState,
    setShowOptionUI: dispatchSetShowOptionUI,
    setDatabaseHasBeenLoaded: dispatchSetDatabaseHasBeenLoaded,
    setConfigOptions: dispatchSetConfigOptions,
    setFavorites: dispatchSetFavorites,
  };
};
