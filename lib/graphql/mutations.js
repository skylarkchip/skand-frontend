import { gql } from "@apollo/client";

// AUTHENTICATION
export const AUTHENTICATE_USER = gql`
  mutation Token($email: String!, $password: String!) {
    token(email: $email, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
      passwordHashed
    }
  }
`;

// TODO
export const CREATE_TODO = gql`
  mutation CreateTodo($content: String!) {
    createTodo(content: $content) {
      id
      content
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo) {
      id
      content
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
