import React from 'react';
import {Col, Row, Form, Button} from "react-bootstrap";


function SearchBar(props) {

  const searchInput = props.searchInput;
  const setSearchInput = props.setSearchInput;
  const setSearchResults = props.setSearchResults;

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
  
  return ( 
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
    );
  }

  export default SearchBar;
