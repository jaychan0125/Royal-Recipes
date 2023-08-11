import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedRecipes = ({ savedRecipes, setSavedRecipes }) => {
  
  const handleDeleteRecipe = (deleteRecipe) => {
    const updatedSavedRecipes = savedRecipes.filter(savedRecipe => savedRecipe.recipeId !== deleteRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedSavedRecipes)); // Update localStorage
    setSavedRecipes(updatedSavedRecipes);  
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5 header">
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
            {savedRecipes?.map((recipe) => {
              return (
                <Col md="4" key={recipe.id}>
                  <Card border="dark">
                    {recipe.image ? (
                      <Card.Img
                        src={recipe.image}
                        alt={`The recipe for ${recipe.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      <p className="small">
                        Preparation Time: {recipe.preparationTime} minutes
                      </p>
                      <Card.Text>{recipe.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => {
                          console.log("Clicked delete for recipe:", recipe);
                          handleDeleteRecipe(recipe.recipeId);
                        }}                      >
                        Delete this Recipe!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SavedRecipes;
