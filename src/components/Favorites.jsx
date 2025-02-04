// src/components/Favorites.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/recipeSlice';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <h3>{recipe.recipe.label}</h3>
          <button onClick={() => dispatch(removeFromFavorites(recipe))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;