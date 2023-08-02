import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeId: String!, $title: String!, $imageUrl: String!, $userId: ID!) {
    saveRecipe(recipeId: $recipeId, title: $title, imageUrl: $imageUrl, userId: $userId) {
      _id
      username
      email
      savedRecipes {
        recipeId
        title
        imageUrl
        # Other recipe details you want to retrieve
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: String!, $userId: ID!) {
    removeRecipe(recipeId: $recipeId, userId: $userId) {
      _id
      username
      email
      savedRecipes {
        recipeId
        title
        imageUrl
        # Other recipe details you want to retrieve
      }
    }
  }
`;
