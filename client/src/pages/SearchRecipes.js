import React, { useState } from "react";
import Cards from '../components/Cards'
import RecipeModal from "../components/RecipeModal";
import SearchBar from "../components/SearchBar";
import { Container, Row, Modal } from "react-bootstrap";


const SearchRecipes = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSaveRecipe = (recipe) => {
    try {
      // Check if the recipe is already saved
      const existingRecipe = props.savedRecipes.find(
        (savedRecipe) => savedRecipe.recipeId === recipe.recipeId
      );

      if (!existingRecipe) {
        // If the recipe is not already saved, add it to the list of saved recipes
        props.savedRecipes.push(recipe);
        localStorage.setItem("savedRecipes", JSON.stringify(props.savedRecipes));
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
              handleViewRecipe={props.handleViewRecipe} 
              handleSaveRecipe={handleSaveRecipe}
              saved={false}
            />
          ))}
        </Row>
      </Container>

      {/* Recipe Popup */}
      <Modal show={props.showRecipePopup} onHide={props.handleCloseRecipePopup}>
        <RecipeModal selectedRecipe={props.selectedRecipe} />
      </Modal>
    </>
  );
};

export default SearchRecipes;
