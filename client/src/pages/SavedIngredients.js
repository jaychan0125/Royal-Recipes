import React from "react";
import { Container, Form } from "react-bootstrap";

const SavedIngredients = ({ selectedIngredients, setselectedIngredients }) => {
  const handleIngredientToggle = (ingredient, event) => {
    try {
      let updatedSelectedIngredients = [...selectedIngredients];

      if (event.target.checked) {
        updatedSelectedIngredients.push(ingredient);
      } else {
        updatedSelectedIngredients = updatedSelectedIngredients.filter(
          (selected) => selected !== ingredient
        );
      }

      setselectedIngredients(updatedSelectedIngredients);
      localStorage.setItem(
        "selectedIngredients",
        JSON.stringify(updatedSelectedIngredients)
      );
    } catch (error) {
      console.error("Error saving ingredients:", error);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5 header ShopH1">
        <Container>
          <h1>Your Shopping List</h1>
        </Container>
      </div>

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
                <Form.Check
                  type="checkbox"
                  label={ingre}
                  checked={selectedIngredients.includes(ingre)}
                  onChange={(event) => handleIngredientToggle(ingre, event)}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
};

export default SavedIngredients;
