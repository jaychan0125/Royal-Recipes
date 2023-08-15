import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import SearchRecipes from "./pages/SearchRecipes";
import SavedRecipes from "./pages/SavedRecipes";

import SavedIngredients from './pages/SavedIngredients';

import Navbar from "./components/Navbar";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [savedRecipes, setSavedRecipes] = useState(
    JSON.parse(localStorage.getItem('savedRecipes')) || []);

  const [selectedIngredients, setSelectedIngredients] = useState(
    JSON.parse(localStorage.getItem('selectedIngredients')) || []);   //set selectedIngredients as an empty array

  const [showRecipePopup, setShowRecipePopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
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

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchRecipes 
              setSavedRecipes={setSavedRecipes} 
              savedRecipes={savedRecipes}
              handleViewRecipe={handleViewRecipe}
              handleCloseRecipePopup={handleCloseRecipePopup}
              showRecipePopup={showRecipePopup}
              selectedRecipe={selectedRecipe}
              />} />
            <Route path="/saved" element={<SavedRecipes 
              savedRecipes={savedRecipes} 
              setSavedRecipes={setSavedRecipes}
              handleViewRecipe={handleViewRecipe}
              handleCloseRecipePopup={handleCloseRecipePopup}
              showRecipePopup={showRecipePopup}
              selectedRecipe={selectedRecipe}
              />} />
            <Route path="/ingredient" element={<SavedIngredients selectedIngredients={selectedIngredients} setselectedIngredients={setSelectedIngredients} />} />

            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
