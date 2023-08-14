import React from "react";
import { Container } from "react-bootstrap";

const SavedIngredients = ({ selectedIngredients, setselectedIngredients }) => {
  return (
    <>
      {/* Header */}
      <div className="text-light bg-dark p-5 header ShopH1">
        <Container>
          <h1>Your Shopping List</h1>
        </Container>
      </div>

      {/* Main Content */}
      <Container>
        <h2 className="pt-5 ShopH2">
          {selectedIngredients?.length
            ? `Viewing ${selectedIngredients.length} saved ${
                selectedIngredients.length === 1 ? "Ingredient" : "Ingredients"
              }:`
            : "You have no saved Ingredients!"}
        </h2>

        <ul className="Shop">
          {selectedIngredients.map((ingre, i) => {
            return (
              <li className="ShopLi" key={"ingredient " + i}>
                {ingre}
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
};

export default SavedIngredients;
