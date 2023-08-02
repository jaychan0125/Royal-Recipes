import React, { useState } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

const SearchRecipes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return;
    }

    try {
      const apiKey = "d59a6e3dde9046a9b6f5bbb557db0a89";
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { results } = await response.json();

      const recipeData = results.map((recipe) => ({
        recipeId: recipe.id,
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.image,
      }));

      setSearchResults(recipeData);
      setSearchInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveRecipe = (recipeId) => {
    // Implement the logic to save the recipe to your database or localStorage
    console.log("Recipe saved:", recipeId);
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Recipes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a recipe"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchResults.length
            ? `Viewing ${searchResults.length} results:`
            : "Search for a recipe to begin"}
        </h2>
        <Row>
          {searchResults.map((recipe) => (
            <Col md="4" key={recipe.recipeId}>
              <Card border="dark" className="mb-3">
                {recipe.image ? (
                  <Card.Img
                    src={recipe.image}
                    alt={`The cover for ${recipe.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.summary}</Card.Text>
                  <Button
                    className="btn-block btn-info"
                    onClick={() => handleSaveRecipe(recipe.recipeId)}
                  >
                    Save This Recipe!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchRecipes;
