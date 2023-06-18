import { gql } from "@apollo/client";

export const schema = gql`
  scalar DateTime

  type User {
    id: ID!
    email: String!
    passwordHashed: String!
    createdAt: Int!
    todos: [Todo!]!
  }

  enum TodoStatus {
    DONE
    TODO
  }

  type Todo {
    id: ID!
    content: String!
    status: TodoStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  type TodoList {
    totalCount: Int!
    totalPage: Int!
    currentPage: Int!
    todos: [Todo!]!
  }

  type Query {
    allUsers: [User]
    allTodos: [Todo]
    user(id: ID!): User
    todo(id: ID!): Todo
    userTodos(page: Int!, pageSize: Int!, searchKeyword: String): TodoList
  }

  input TodoInput {
    id: ID!
    content: String
    status: TodoStatus
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    createTodo(content: String!): Todo
    updateTodo(todo: TodoInput!): Todo
    deleteTodo(id: ID!): Boolean
    token(email: String!, password: String!): String
  }
`;
