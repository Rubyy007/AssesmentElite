// src/App.jsx
import React from 'react';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Recipe App</h1>
      <SearchBar />
      <RecipeList />
      <Favorites />
    </div>
  );
};

export default App;