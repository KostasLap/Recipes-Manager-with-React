# Recipes Manager Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Components](#components)
5. [Usage](#usage)
6. [Local Storage](#local-storage)



## Introduction

The Recipes Manager application is a React-based application that allows users to manage their favorite recipes. Users can add, delete, search, filter, update, and mark recipes as favorite. Additionally, users can generate a report summarizing the total number of recipes and their favorite status.

## Features

- **Add Recipe:** Add a new recipe with a name, description, and category.
- **Delete Recipe:** Remove a recipe from the list.
- **Update Description:** Update the description of an existing recipe.
- **Favorite Recipe:** Mark a recipe as favorite or unfavorite.
- **Filter Recipes:** Display only favorite recipes.
- **Sort Recipes:** Sort recipes by category.
- **Search Recipes:** Search for recipes by name or description.
- **Generate Report:** Display a report summarizing the total number of recipes and their favorite status.

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## Components

### Recipes.js

This is the main component of the application which includes all the functionalities for managing recipes.

- **State Variables:**
  - `recipes`: List of recipes.
  - `newRecipeName`: Name of the new recipe.
  - `newDescription`: Description of the new recipe.
  - `newCategory`: Category of the new recipe.
  - `showFavourite`: Boolean to toggle favorite recipes view.
  - `generateReport`: Boolean to toggle the display of the report.
  - `tempDescription`: Temporary description for updating a recipe.
  - `search`: Search query.
  - `temp`: Temporary search input.

- **Functions:**
  - `addRecipe()`: Adds a new recipe to the list.
  - `deleteRecipe(id)`: Deletes a recipe from the list.
  - `toggleFavourite(id)`: Toggles the favorite status of a recipe.
  - `toggleShowFavourite()`: Toggles the view to show only favorite recipes.
  - `sortRecipesByCategory`: Permanently sort the existing list.
  - `report()`: Toggles the display of the report.
  - `toggleUpdate(id)`: Toggles the update description input for a recipe.
  - `handleUpdateDescription(id)`: Updates the description of a recipe.
  - `display()`: Returns the list of recipes based on search, filter, and sort criteria.

## Usage

1. **Add a Recipe:**
   - Enter the recipe name, description, and select a category.
   - Click the "Add Recipe" button to add the recipe to the list.

2. **Delete a Recipe:**
   - Click the "Delete" button next to the recipe you want to remove.

3. **Update Description:**
   - Click the "Update Description" button next to the recipe you want to update.
   - Enter the new description in the input field.
   - Click "Save" to update the description.
   - Click "Cancel" to cancel the update.

4. **Favorite/Unfavorite a Recipe:**
   - Click the "Favourite" button to mark a recipe as favorite.
   - Click the "UnFavourite" button to unmark a recipe as favorite.

5. **Filter Recipes:**
   - Click the "Show Favourite" button to display only favorite recipes.
   - Click the "Show All" button to display all recipes.

6. **Sort Recipes:**
   - Click the "Sorted" button to sort recipes by category.
   - Click the "Unsorted" button to display recipes in their original order.

7. **Search Recipes:**
   - Enter a search term in the search input field.
   - Click the "Search" button to filter recipes by name or description.

8. **Generate Report:**
   - Click the "Generate report" button to display a summary report of recipes.
   - The report will display the total number of recipes, the number of favorite recipes, and the number of non-favorite recipes.

## Local Storage

The application uses the browser's local storage to persist recipe data. This ensures that recipes are saved even when the browser is closed or the page is refreshed.

### How It Works

- **Saving Recipes:**
  - Recipes are saved to local storage whenever they are added, deleted, or updated.
  - This is handled in the `useEffect` hook which listens for changes to the `recipes` state variable:
    ```javascript
    useEffect(() => {
        if (recipes.length === 0) {
            return;
        } else {
            localStorage.setItem("recipes", JSON.stringify(recipes));
        }
    }, [recipes]);
    ```

- **Loading Recipes:**
  - Recipes are loaded from local storage when the application loads.
  - This is handled in another `useEffect` hook which runs once when the component mounts:
    ```javascript
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("recipes"));
        if (data) {
            setRecipes(data);
        }
    }, []);
    ```




