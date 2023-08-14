import React from 'react';
import {Col, Button, Card} from "react-bootstrap";


function Cards(props) {
  
  const handleSaveRecipe = props.handleSaveRecipe;
  const handleViewRecipe = props.handleViewRecipe;
  
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
            <Button
              className="btn-block btn-info mt-2"
              onClick={() => handleSaveRecipe(props.recipe)}
            >
              Save This Recipe!
            </Button>
          </Card.Body>
        </Card>
      </Col>

    );
  }

  export default Cards;
