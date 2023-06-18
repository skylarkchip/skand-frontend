import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "@/redux/todo";
import { useQuery } from "@apollo/client";
import { FETCH_USER_TODOS } from "@/lib/graphql/queries";

// Components
const Button = dynamic(() => import("../button/button.component"));

function SearchForm({ onSearchInput, onSearch }) {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state.todo.searchKeyword);
  const [skipQuery, setSkipQuery] = useState(true);
  const { refetch } = useQuery(FETCH_USER_TODOS, {
    variables: { page: 1, pageSize: 3, searchKeyword: searchKeyword },
    skip: skipQuery,
    onCompleted: (data) => {
      dispatch(todoActions.setTodos(data.userTodos));
      setSkipQuery(true);
    },
  });

  return (
    <div className="flex gap-x-2 w-full">
      <div className="p-4 bg-custom-off-white shadow-md rounded-xl flex gap-x-4 items-center w-full">
        <input
          placeholder="search todos..."
          className="bg-inherit w-full outline-none placeholder:text-custom-light-gray placeholder:text-[14px]"
          onChange={(e) =>
            dispatch(todoActions.setSearchKeyword(e.target.value))
          }
          value={searchKeyword}
        />
      </div>
      <Button
        isPrimary={true}
        onClick={() => {
          setSkipQuery(false);
          refetch({ page: 1, pageSize: 3, searchKeyword: searchKeyword });
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchForm;
