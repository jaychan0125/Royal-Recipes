import React, { useState } from "react";
import Cards from '../components/Cards'
import RecipeModal from "../components/RecipeModal";
import SearchBar from "../components/SearchBar";
import { Container, Row, Modal } from "react-bootstrap";


const SearchRecipes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  ); 

  const handleSaveRecipe = (recipe) => {
    try {
      // // Check if there are saved recipes in localStorage
      // const savedRecipes =
      //   JSON.parse(localStorage.getItem("savedRecipes")) || [];

      // Check if the recipe is already saved
      const existingRecipe = savedRecipes.find(
        (savedRecipe) => savedRecipe.recipeId === recipe.recipeId
      );

      if (!existingRecipe) {
        // If the recipe is not already saved, add it to the list of saved recipes
        savedRecipes.push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
        console.log("Recipe saved:", recipe);
        // console.log(savedRecipes);
      } else {
        // If the recipe is already saved, you can show a message or handle it as needed
        console.log("Recipe is already saved.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleViewRecipe = async (recipeId) => {
    try {
      const apiKey = "d59a6e3dde9046a9b6f5bbb557db0a89";
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details.");
      }

      const recipeDetails = await response.json();
      console.log(recipeDetails);
      setSelectedRecipe(recipeDetails);
      handleShowRecipePopup();
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleShowRecipePopup = () => {
    setShowRecipePopup(true);
  };

  const handleCloseRecipePopup = () => {
    setShowRecipePopup(false);
  };

  const handleIngredientToggle = (ingredient, event) => {
    try {
      // selectedIngredients is an empty array defined above with useState([])
      let updatedSelectedIngredients = [...selectedIngredients]; // Create a new array to avoid mutation

      if (event.target.checked) {
        updatedSelectedIngredients.push(ingredient);
      } else {
        updatedSelectedIngredients = updatedSelectedIngredients.filter(
          (selected) => selected !== ingredient
        );
      }

      console.log(updatedSelectedIngredients);
      localStorage.setItem("savedOrders", JSON.stringify(updatedSelectedIngredients));

      setSelectedIngredients(updatedSelectedIngredients);
      localStorage.setItem("selectedIngredients", JSON.stringify(updatedSelectedIngredients));
    } catch (error) {
      console.error("Error saving ingredients:", error);
    }
  };


  return (
    <>
      {/* Header */}
      <div className="text-light bg-dark p-5 header">
        <Container>
          <h1>Search for Recipes!</h1>
          <SearchBar 
          searchInput={searchInput} 
          setSearchInput={setSearchInput}
          setSearchResults={setSearchResults}
          />
        </Container>
      </div> 

      {/* Main Content */}
      <Container>
        <h2 className="pt-5">
          {searchResults.length
            ? `Viewing ${searchResults.length} results:`
            : "Search for a recipe to begin"}
        </h2>
        <Row>
          {searchResults.map((recipe, i) => (            
            <Cards key={'card: ' + i}
              recipe={recipe} 
              handleViewRecipe={handleViewRecipe} 
              handleSaveRecipe={handleSaveRecipe}
              saved={false}
            />
          ))}
        </Row>
      </Container>

      {/* Recipe Popup */}
      <Modal show={showRecipePopup} onHide={handleCloseRecipePopup}>
        <RecipeModal selectedRecipe={selectedRecipe} />
      </Modal>
    </>
  );
};

export default SearchRecipes;
