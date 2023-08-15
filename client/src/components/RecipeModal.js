import React, { useState } from 'react';
import {Modal, InputGroup, Form} from "react-bootstrap";


function RecipeModal(props) {

  const selectedRecipe = props.selectedRecipe;
  const [selectedIngredients, setSelectedIngredients] = useState(
    JSON.parse(localStorage.getItem('selectedIngredients')) || []);  

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

      setSelectedIngredients(updatedSelectedIngredients);
      localStorage.setItem("selectedIngredients", JSON.stringify(updatedSelectedIngredients));
    } catch (error) {
      console.error("Error saving ingredients:", error);
    }
  };
  
  return ( 
    <>
      <Modal.Header closeButton>
        <Modal.Title>{selectedRecipe?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Ingredients:</h4>
        {selectedRecipe?.extendedIngredients?.map((ingredient, i) => (
          <InputGroup className="mb-3" key={'ingredient: '+ i + ingredient.id}>
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
    </>
    );
  }

  export default RecipeModal;
