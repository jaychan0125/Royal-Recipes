import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedRecipes {
        recipeId
        title
        imageUrl
       
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query recipes($searchTerm: String!) {
    recipes(searchTerm: $searchTerm) {
      recipeId
      title
      imageUrl
    }
  }
`;

export const QUERY_RECIPE = gql`
  query recipe($recipeId: String!) {
    recipe(recipeId: $recipeId) {
      recipeId
      title
      imageUrl
    }
  }
`;

export const QUERY_USER_REVIEWS = gql`
  query userReviews($userId: ID!) {
    userReviews(userId: $userId) {
      _id
      recipeId
      userId
      rating
      reviewText
    }
  }
`;
