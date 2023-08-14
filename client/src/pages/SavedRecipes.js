import React from "react";
import { Container, Row } from "react-bootstrap";
import Cards from "../components/Cards";

const SavedRecipes = ({ savedRecipes, setSavedRecipes }) => {
  
  const handleDeleteRecipe = (deleteRecipe) => {
    const updatedSavedRecipes = savedRecipes.filter(savedRecipe => savedRecipe.recipeId !== deleteRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes)); // Update localStorage
    setSavedRecipes(updatedSavedRecipes);  
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
          {savedRecipes?.length
            ? `Viewing ${savedRecipes.length} saved ${
                savedRecipes.length === 1 ? "recipe" : "recipes"
              }:`
            : "You have no saved recipes!"}
        </h2>
        <div>
          <Row>
            {savedRecipes?.map((recipe, i) => {
              return (
                <Cards key={'savecard: ' + i}
                  recipe={recipe}
                  handleDeleteRecipe= {handleDeleteRecipe}
                  saved={true}
                />
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedRecipes;
