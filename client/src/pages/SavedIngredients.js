import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedIngredients = ({ selectedIngredients, setselectedIngredients }) => {

  return (
    <>
      {/* Header */}
      <div className="text-light bg-dark p-5 header">
        <Container>
          <h1>Your Selected Ingredients!</h1>
        </Container>
      </div>
      {/* Main Content */}
      <Container>
      <h2 className="pt-5">
          {selectedIngredients?.length
            ? `Viewing ${selectedIngredients.length} saved ${
              selectedIngredients.length === 1 ? "Ingredient" : "Ingredients"
              }:`
            : "You have no saved Ingredients!"}
        </h2>
        <ul>
          {selectedIngredients.map((ingre, i) => {
            return (
              <li key={'ingredient ' + i}>{ingre}</li>
            )
          })}
        </ul>
      </Container>
    </>
  );
};

export default SavedIngredients;