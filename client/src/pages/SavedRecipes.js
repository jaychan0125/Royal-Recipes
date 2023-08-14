import React from "react";
import { Container, Row, Modal } from "react-bootstrap";
import Cards from "../components/Cards";
import RecipeModal from "../components/RecipeModal";

const SavedRecipes = (props) => {
  
  const handleDeleteRecipe = (deleteRecipe) => {
    const updatedSavedRecipes = props.savedRecipes.filter(savedRecipe => savedRecipe.recipeId !== deleteRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes)); // Update localStorage
    props.setSavedRecipes(updatedSavedRecipes);  
  }

  return (
    <>
      <div className="text-light bg-dark p-5 header">
        <Container>
          <h1>Your Saved Recipes</h1>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {props.savedRecipes?.length
            ? `Viewing ${props.savedRecipes.length} saved ${
                props.savedRecipes.length === 1 ? "recipe" : "recipes"
              }:`
            : "You have no saved recipes!"}
        </h2>
        <div>
          <Row>
            {props.savedRecipes?.map((recipe, i) => {
              return (
                <Cards key={'savecard: ' + i}
                  recipe={recipe}
                  handleViewRecipe={props.handleViewRecipe} 
                  handleDeleteRecipe= {handleDeleteRecipe}
                  saved={true}
                />
              );
            })}
          </Row>
        </div>
      </Container>

      {/* Recipe Popup */}
      <Modal show={props.showRecipePopup} onHide={props.handleCloseRecipePopup}>
        <RecipeModal selectedRecipe={props.selectedRecipe} />
      </Modal>

    </>
  );
};

export default SavedRecipes;
