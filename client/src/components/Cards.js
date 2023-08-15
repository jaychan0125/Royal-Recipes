import React from 'react';
import {Col, Button, Card} from "react-bootstrap";


function Cards(props) {
  
  const handleSaveRecipe = props.handleSaveRecipe;
  const handleViewRecipe = props.handleViewRecipe;
  const handleDeleteRecipe = props.handleDeleteRecipe;

  // Checks to see which page is requesting cards and will render required buttons
  const renderButton = () => {
    if (props.saved) {
      return (
        <Button
        className="btn-block btn-danger mt-2"
        onClick={() => {
          console.log("Clicked delete for recipe:", props.recipe);
          handleDeleteRecipe(props.recipe.recipeId);
        }}                      >
        Delete this Recipe!
      </Button>
      )
    } else {
      return (
          <Button
            className="btn-block btn-info mt-2"
            onClick={(e) => handleSaveRecipe(props.recipe, e)}
          >
            Save This Recipe!
          </Button>
      )
    }
  }
  
  return ( 
      <Col md="4" key={'recipe: '+ props.recipeId}>
        <Card border="dark" className="mb-3">
          {props.recipe.image ? (
            <Card.Img
              src={props.recipe.image}
              alt={`The cover for ${props.recipe.title}`}
              variant="top"
            />
          ) : null}
          <Card.Body>
            <Card.Title>{props.recipe.title}</Card.Title>
            <Card.Text>{props.recipe.summary}</Card.Text>
            <Button
            className="btn-block btn-info"
            onClick={() => handleViewRecipe(props.recipe.recipeId)}
          >
            View Recipe Details
          </Button>
            {renderButton()}
          </Card.Body>
        </Card>
      </Col>

    );
  }

  export default Cards;
