// src/redux/slices/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.edamam.com/search';
const APP_ID = 'a5de3521';
const APP_KEY = '28f8a20bd893e2740e68d4bbb349b977';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ query, filters }) => {
    const response = await axios.get(API_URL, {
      params: {
        q: query,
        app_id: APP_ID,
        app_key: APP_KEY,
        from: 0,
        to: 50,
        ...filters,
      },
    });
    return response.data.hits;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (recipe) => recipe.recipe.uri !== action.payload.recipe.uri
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;