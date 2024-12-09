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
    selectedLanguages: string[];
  };
  favorites: number[];
  queryString: string;
  filteredData: any[];
}

const initialState: OptionsState = {
  showOptionUI: false,
  databaseHasBeenLoaded: false,
  configOptions: {
    copyTheTextBelow: true,
    copyTheTextAbove: true,
    showFavoritesListOnly: false,
    selectedLanguages: ["en", "zh"],
  },
  favorites: [],
  queryString: '',
  filteredData: [],
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    initializeConfigOptions(state, action: PayloadAction<Partial<OptionsState['configOptions']>>) {
      if (action.payload) {
        if (typeof action.payload.copyTheTextBelow === 'boolean') {
          state.configOptions.copyTheTextBelow = action.payload.copyTheTextBelow;
        }
        if (typeof action.payload.copyTheTextAbove === 'boolean') {
          state.configOptions.copyTheTextAbove = action.payload.copyTheTextAbove;
        }
        if (typeof action.payload.showFavoritesListOnly === 'boolean') {
          state.configOptions.showFavoritesListOnly = action.payload.showFavoritesListOnly;
        }
        if (Array.isArray(action.payload.selectedLanguages)) {
          state.configOptions.selectedLanguages = action.payload.selectedLanguages;
        }
      }
      state.databaseHasBeenLoaded = true;
    },
    setShowOptionUI(state, action: PayloadAction<boolean>) {
      state.showOptionUI = action.payload;
    },
    setDatabaseHasBeenLoaded(state, action: PayloadAction<boolean>) {
      state.databaseHasBeenLoaded = action.payload;
    },
    batchUpdateConfigOptions(state, action: PayloadAction<Partial<OptionsState['configOptions']>>) {
      Object.entries(action.payload).forEach(([key, value]) => {
        (state.configOptions as any)[key] = value;
      });
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
    setQuery: (state, action: PayloadAction<string>) => {
      state.queryString = action.payload;
    },
    handleShowMode: (
      state
    ) => {
      //const { showFavoritesListOnly} = action.payload;
      console.log(
        "%c handleShowMode",
        "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
        "state:",
        JSON.parse(JSON.stringify(state)),
      );
      
      if (state.databaseHasBeenLoaded) {
        showCustomToast(state.configOptions.showFavoritesListOnly ? "最愛模式" : "全部模式");
        
        optionsSlice.caseReducers.applyFilter(state);
      }
    },
   handleInputChange: (state, action: PayloadAction<string>) => {
    console.log(
      "%c handleInputChange",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "action:",
      action,
    );
    state.queryString =action.payload;
    optionsSlice.caseReducers.applyFilter(state);
   },
   applyFilter: (state) => {
    const inputQueryString = state.queryString.trim();
    let mergedData = language_data_sheet.map((item) => ({
      ...item,
      tag: "",
    }));
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
      if (inputQueryString.length === 0) {
        return state.configOptions.showFavoritesListOnly
          ? state.favorites.includes(item.index)
          : true;
      }

      return (
        Object.values(item.translations).some((translation: string) =>
          translation.toLowerCase().includes(inputQueryString.toLowerCase())
        ) &&
        (!state.configOptions.showFavoritesListOnly ||
          state.favorites.includes(item.index))
      );
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
        state.favorites = favorites.filter(fav => fav !== index);
        showCustomToast("已移除最愛");
      } else {
        state.favorites.push(index);
        showCustomToast("已添加至最愛");
      }
   },
  },
});

export const { initializeConfigOptions,setShowOptionUI, setDatabaseHasBeenLoaded, setConfigOptions, updateConfigOptions, setFavorites, handleShowMode, handleInputChange, toggleStarred, setQuery } = optionsSlice.actions;

export default optionsSlice.reducer;



type OptionsActions = {
  [Key in keyof typeof optionsSlice.actions]: (
    payload: Parameters<(typeof optionsSlice.actions)[Key]>[0]
  ) => void;
};
export const useOptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const optionsState = useSelector((state: RootState) => state.options);
  const actions: OptionsActions = Object.keys(optionsSlice.actions).reduce(
    (accumulator, actionName) => {
      accumulator[actionName as keyof OptionsActions] = (payload) =>
        dispatch((optionsSlice.actions as any)[actionName](payload));
      return accumulator;
    },
    {} as OptionsActions
  );
  return {
    ...optionsState,
    ...actions,
  };
};
