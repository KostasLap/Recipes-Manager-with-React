import { useEffect, useState } from "react";
import "./Css.css";

function Recipes() {
    const [recipes, setRecipes] = useState([])     
    const [newRecipeName, setRecipeName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [showFavourite, setShowFavourite] = useState(false);
    const [sortShow, setSortShow] = useState(false);
    const [generateReport, setGenerateReport] = useState(false);
    const [tempDescription, setTempDescription] = useState("");
    const [search, setSearch] = useState("");
    const [temp, setTemp] = useState("");



    useEffect(() => { 
        if(recipes.length===0 ){
            
            return;
        }  else {
            localStorage.setItem("recipes", JSON.stringify(recipes));
        }
        
    }, [recipes]);


    useEffect(() => {    
            const data = JSON.parse(localStorage.getItem("recipes"));
            if (data) {
                setRecipes(data);
            }  
        }, []);

    function addRecipe() {
        let newRecipe = {
            id: recipes.length+1,
            name: newRecipeName,
            description: newDescription,
            category: newCategory,
            favourite: false,
            updateButton: false,
        };

        let updatedRecipesList = [...recipes];
        updatedRecipesList.push(newRecipe);
        setRecipes(updatedRecipesList);
        setRecipeName("");
        setNewDescription("");
        setNewCategory("");
           
    }

    function deleteRecipe(id) {
        let updateRecipeList = recipes.filter((recipe) => recipe.id !== id);

        setRecipes(updateRecipeList); 
        localStorage.setItem("recipes", JSON.stringify(updateRecipeList));
        


    }

    function toggleFavourite(id) {
        let updatedRecipeList = recipes.map((recipe) => {
            if (recipe.id === id) {
                return { ...recipe, favourite: !recipe.favourite };
            }
            return recipe;
        });

        setRecipes(updatedRecipeList);
    }

    function toggleShowFavourite() {
        setShowFavourite(!showFavourite);
    }

    function toggleSortShow() {
        setSortShow(!sortShow);
    }


    function report() {
        setGenerateReport(!generateReport);
    }

    function toggleUpdate(id) {
        let updatedRecipeList = recipes.map((recipe) => {
            if (recipe.id === id) {
                setTempDescription(recipe.description); 
                return { ...recipe, updateButton: !recipe.updateButton };
            }
            return recipe;
        });

        setRecipes(updatedRecipeList);

        
    }

    function handleUpdateDescription(id) {
        let updatedRecipeList = recipes.map((recipe) => {
            if (recipe.id === id) {
                return { ...recipe, description: tempDescription, updateButton: false };
            }
            return recipe;
        });

        setRecipes(updatedRecipeList);
        setTempDescription("");    
    }


    function display(){
        let displayList = recipes;

        if(search.trim() !==""){
            displayList=
            recipes.filter((recipe)=>recipe.name.toLowerCase().includes(search.toLowerCase())||
            recipe.description.toLowerCase().includes(search.toLowerCase()));
            return displayList
        }

        if(showFavourite){
            displayList = recipes.filter((recipe)=>recipe.favourite===true)
            return displayList
        } else if(sortShow){
            displayList = recipes.sort((a, b) =>
                a.category.localeCompare(b.category))
            return displayList
        } else{
            return displayList
        }
    }

    
    

    return (
        <div>
            <h1>Recipes Manager</h1>
            <div className="add-recipes">
                <input
                    id="recipesName"
                    type="text"
                    placeholder="Enter recipe"
                    value={newRecipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <input
                    id="recipeDescription"
                    type="text"
                    placeholder="Enter description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <select
                    name="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <button className="add-button" onClick={addRecipe}>
                    Add Recipe
                </button>
            </div>

            <div className="recipe-filter">
                <button className="show-button" onClick={toggleShowFavourite}>
                    {showFavourite ? "Show All" : "Show Favourite"}
                </button>
                <button className="show-button" onClick={toggleSortShow}>
                    {sortShow ? "Unsorted" : "Sorted"}
                </button>
                <form className="filter-form" onSubmit={(e)=>e.preventDefault()}>
                    <input id="recipeFilter" type="text" placeholder="search recipes" value={temp} onChange={(e)=>setTemp(e.target.value)}/>
                    <button id="search-button" type="submit" onClick={()=>{
                        setSearch(temp);
                        setTemp("");
                           
                    }}>Search</button>
                </form>
            </div>
            
            <div id="display">
                <ol>
                    {display().map((recipe,index) => (
                        <li key={index}>
                            <span>Title: <span>{recipe.name}</span> </span>
                            <span>Description: <span>{recipe.description}</span> </span>
                            {recipe.updateButton ? (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Update description"
                                        onChange={(e) => setTempDescription(e.target.value)}
                                        value={tempDescription}
                                    />
                                    <button
                                        className="save-update-description-button"
                                        onClick={() => handleUpdateDescription(recipe.id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-update"
                                        onClick={() => toggleUpdate(recipe.id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="update-description-button"
                                    onClick={() => toggleUpdate(recipe.id)}
                                >
                                    Update Description
                                </button>
                            )}
                            <span>Category: <span>{recipe.category}</span></span>
                            {recipe.favourite ? (
                                <button
                                    className="favourite-button"
                                    style={{ backgroundColor: "green" }}
                                    onClick={() => toggleFavourite(recipe.id)}
                                >
                                    UnFavourite
                                </button>
                            ) : (
                                <button
                                    className="not-favourite-button"
                                    style={{ backgroundColor: "red" }}
                                    onClick={() => toggleFavourite(recipe.id)}
                                >
                                    Favourite
                                </button>
                            )}
                            <button className="delete-button" onClick={() => deleteRecipe(recipe.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ol>

            </div>

            <div className="report">
                <button onClick={report}>Generate report</button>
                <p>
                    {generateReport
                        ? `Total recipes: ${recipes.length}\n 
                        Number of favourite recipes: ${
                            recipes.filter((recipe) => recipe.favourite).length
                        }\n
                        Number of not favourite recipes: ${
                            recipes.length -
                            recipes.filter((recipe) => recipe.favourite).length
                        }`
                        : ""}
                </p>
            </div>
        </div>
    );
}

export default Recipes;
