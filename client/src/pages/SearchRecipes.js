import React, { useState } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Modal,
  InputGroup,
} from "react-bootstrap";

const SearchRecipes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);   //set selectedIngredients as an empty array
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes")) || []
  ); 

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

      setSelectedIngredients(updatedSelectedIngredients);
      localStorage.setItem("selectedIngredients", JSON.stringify(updatedSelectedIngredients));
    } catch (error) {
      console.error("Error saving ingredients:", error);
    }
  };


  return (
    <>
      <div className="text-light bg-dark p-5 header">
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
                    onClick={() => handleViewRecipe(recipe.recipeId)}
                  >
                    View Recipe Details
                  </Button>
                  <Button
                    className="btn-block btn-info mt-2"
                    onClick={() => handleSaveRecipe(recipe)}
                  >
                    Save This Recipe!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Recipe Popup */}
      <Modal show={showRecipePopup} onHide={handleCloseRecipePopup}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ingredients:</h4>
          {selectedRecipe?.extendedIngredients?.map((ingredient) => (
            <InputGroup className="mb-3" key={ingredient.id}>
              <InputGroup.Checkbox
                aria-label="Checkbox for ingredients"
                onChange={(event) => handleIngredientToggle(ingredient.original, event)}
                checked={selectedIngredients.includes(ingredient.original)}
              />
              <Form.Control
                type="text"
                aria-label="Text input with checkbox"
                value={ingredient.original}
                readOnly
              />
            </InputGroup>
          ))}
          <h4>Instructions:</h4>
          <div
            dangerouslySetInnerHTML={{ __html: selectedRecipe?.instructions }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchRecipes;
