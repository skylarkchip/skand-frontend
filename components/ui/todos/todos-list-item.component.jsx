import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "@/redux/todo";

// Mutations
import { DELETE_TODO, UPDATE_TODO } from "@/lib/graphql/mutations";

// Queries
import { FETCH_USER_TODOS } from "@/lib/graphql/queries";

function TodosListItem({ todo }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.todo.currentPage);
  const [skipQuery, setSkipQuery] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  // GraphQL - Query - Mutations
  const { refetch } = useQuery(FETCH_USER_TODOS, {
    variables: { page: currentPage, pageSize: 3 },
    skip: skipQuery,
    onCompleted: (data) => {
      dispatch(todoActions.setTodos(data.userTodos));
      skipQuery(true);
    },
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const onCompleteHandler = () => {
    updateTodo({
      variables: {
        todo: {
          id: todo.id,
          status: "DONE",
        },
      },
    });
    dispatch(todoActions.setCurrentPage(1));
    setSkipQuery(false);
    refetch({ page: currentPage, pageSize: 3 });
  };

  const onEditHandler = () => {
    setIsEditing(true);
  };

  const onSaveEditHandler = () => {
    updateTodo({
      variables: {
        todo: {
          id: todo.id,
          content: content,
          status: "TODO",
        },
      },
    });
    setIsEditing(false);
    setSkipQuery(false);
    refetch({ page: currentPage, pageSize: 3 });
  };

  const onCancelEditHandler = () => {
    setContent(todo.content);
    setIsEditing(false);
  };

  const onDeleteHandler = () => {
    deleteTodo({
      variables: {
        id: todo.id,
      },
    });
    refetch({ page: 1, pageSize: 3 });
    setSkipQuery(false);
    dispatch(todoActions.setCurrentPage(1));
  };

  const onInputFieldChangeHandler = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-1 items-center">
        {todo.status === "TODO" ? (
          <BsCircle className="text-custom-pink text-lg mr-4" />
        ) : (
          <BsCheckCircleFill className="text-custom-pink text-lg mr-4" />
        )}
        {isEditing ? (
          <div className="p-4 rounded-2xl border border-custom-pink w-full">
            <input
              type="text"
              value={content}
              className="outline-none bg-inherit w-full"
              onChange={onInputFieldChangeHandler}
              autoFocus
            />
          </div>
        ) : (
          <p
            className={`${
              todo.status !== "DONE"
                ? "text-custom-black"
                : "text-custom-light-gray line-through"
            } text-base break-words flex-1`}
          >
            {content}
          </p>
        )}
      </div>
      <div className="flex flex-1 gap-x-2 justify-end items-center">
        {isEditing ? (
          <>
            <button
              className="text-custom-gray text-base hover:text-custom-pink"
              onClick={onCancelEditHandler}
            >
              Cancel
            </button>
            <button
              className="text-custom-gray text-base hover:text-custom-pink"
              onClick={onSaveEditHandler}
            >
              Done
            </button>
          </>
        ) : (
          <>
            <button
              className="text-custom-gray text-base hover:text-custom-pink"
              onClick={onEditHandler}
            >
              Edit
            </button>
            {todo.status === "DONE" ? (
              <button
                className="text-custom-gray text-base hover:text-custom-pink"
                onClick={onDeleteHandler}
              >
                Remove
              </button>
            ) : (
              <button
                className="text-custom-gray text-base hover:text-custom-pink"
                onClick={onCompleteHandler}
              >
                Done
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodosListItem;
