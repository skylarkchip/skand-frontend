import { gql } from "@apollo/client";

// TODO
export const FETCH_USER_TODOS = gql`
  query FetchUserTodos($page: Int!, $pageSize: Int!, $searchKeyword: String) {
    userTodos(page: $page, pageSize: $pageSize, searchKeyword: $searchKeyword) {
      currentPage
      totalCount
      totalPage
      todos {
        id
        content
        status
      }
    }
  }
`;
