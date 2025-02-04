// src/components/RecipeList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, addToFavorites } from '../redux/slices/recipeSlice';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, status, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes({ query: 'pizza' }));
  }, [dispatch]);

  const handleAddToFavorites = (recipe) => {
    dispatch(addToFavorites(recipe));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <h2>{recipe.recipe.label}</h2>
          <p>{recipe.recipe.ingredientLines.join(', ')}</p>
          <button
            onClick={() => handleAddToFavorites(recipe)}
            className="favorite-button"
          >
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;