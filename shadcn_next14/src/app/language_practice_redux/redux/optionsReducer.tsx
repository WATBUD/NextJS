/* eslint-disable react-hooks/exhaustive-deps */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store'; 
import { showCustomToast } from '../../common/sharedFunction';
import language_data_sheet from "../../common/language_data_sheet.json";
import language_data_tag from "../../common/language_data_tag.json";

export interface OptionsState {
  showOptionUI: boolean;
  databaseHasBeenLoaded: boolean;
  configOptions: {
    copyTheTextBelow: boolean;
    copyTheTextAbove: boolean;
    showFavoritesListOnly: boolean;
  };
  favorites: number[];
  query: string;
  filteredData: any[];
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
  query: '',
  filteredData: [],
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
    handleShowMode: (
      state,
      action: PayloadAction<{
        showFavoritesListOnly: boolean;
        databaseHasBeenLoaded: boolean;
      }>
    ) => {
      const { showFavoritesListOnly, databaseHasBeenLoaded} = action.payload;

      if (databaseHasBeenLoaded) {
        showCustomToast(showFavoritesListOnly ? "最愛模式" : "全部模式");
        const event: any = {
          target: {
            value: state.query,
          },
        };
        handleInputChange(event.target.value);
      }
    },
  handleInputChange: (state, action: PayloadAction<string>) => {
    
    console.log(
      "%c handleInputChange",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "action:",
      action,
    );

      const newQuery = action.payload;

      state.query = newQuery;

      let mergedData = language_data_sheet.map(item => ({ ...item, tag: '' }));
      const missingIndexes: number[] = [];

      language_data_tag.forEach((tagItem, index) => {
        if (mergedData[index]) {
          mergedData[index].tag = tagItem.tag;
        } else {
          missingIndexes.push(tagItem.index);
        }
      });

      if (missingIndexes.length > 0) {
        console.log(
          "%c Missing indexes in mergedData:",
          "color:#FF0000;font-family:system-ui;font-size:1.5rem;font-weight:bold",
          missingIndexes
        );
      }

      console.log(
        "%c mergedData",
        "color:#DDDD00;font-family:system-ui;font-size:2rem;font-weight:bold",
        mergedData
      );

      const filtered = mergedData.filter((item) => {
        return Object.values(item.translations).some((translation: string) =>
          translation.toLowerCase().includes(newQuery.toLowerCase())
        ) && (!state.configOptions.showFavoritesListOnly || state.favorites.includes(item.index));
      });

      console.log(
        "%c languagePracticeTool_filtered",
        "color:#DDDD00;font-family:system-ui;font-size:2rem;font-weight:bold",
        "filtered:",
        filtered
      );

      state.filteredData = filtered;

      if (filtered.length <= 0 && state.configOptions.showFavoritesListOnly) {
        showCustomToast("最愛模式:無收藏名單");
      }
    },
    toggleStarred: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const favorites = state.favorites;

      if (favorites.includes(index)) {
        // 如果已經存在，則移除
        state.favorites = favorites.filter(fav => fav !== index);
        showCustomToast("已移除最愛");
      } else {
        // 如果不存在，則添加
        state.favorites.push(index);
        showCustomToast("已添加至最愛");
      }
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setShowOptionUI, setDatabaseHasBeenLoaded, setConfigOptions, updateConfigOptions, setFavorites, handleShowMode, handleInputChange, toggleStarred, setQuery } = optionsSlice.actions;

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

  return {
    ...optionsState,
    setShowOptionUI: dispatchSetShowOptionUI,
    setDatabaseHasBeenLoaded: dispatchSetDatabaseHasBeenLoaded,
    setConfigOptions: dispatchSetConfigOptions,
    setFavorites: dispatchSetFavorites,
  };
};
