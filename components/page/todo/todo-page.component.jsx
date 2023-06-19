import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";

// Queries
import { FETCH_USER_TODOS } from "@/lib/graphql/queries";
import { CREATE_TODO } from "@/lib/graphql/mutations";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "@/redux/todo";

// Components
const Layout = dynamic(() => import("@/components/layout/layout.component"));
const InputField = dynamic(() =>
  import("@/components/ui/input/input-field.component")
);
const SearchForm = dynamic(() =>
  import("@/components/ui/forms/search-form.component")
);
const Button = dynamic(() => import("@/components/ui/button/button.component"));
const TodosList = dynamic(() =>
  import("@/components/ui/todos/todos-list.component")
);
const Pagination = dynamic(() =>
  import("@/components/ui/pagination/pagination.component")
);

function TodoPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const searchKeyword = useSelector((state) => state.todo.searchKeyword);
  const currentPage = useSelector((state) => state.todo.currentPage);

  const [todoInput, setTodoInput] = useState("");

  // GraphQL Query - Mutation
  const { loading, refetch } = useQuery(FETCH_USER_TODOS, {
    variables: { page: currentPage, pageSize: 3 },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      dispatch(todoActions.setTodos(data.userTodos));
    },
  });
  const [createTodo] = useMutation(CREATE_TODO);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onInputFieldChangeHandler = (e) => {
    setTodoInput(e.target.value);
  };

  const onTodoAddHandler = () => {
    if (todoInput !== "") {
      createTodo({
        variables: { content: todoInput },
      });
      setTodoInput("");
      refetch({ page: 1, pageSize: 3 });
    }
  };

  const onPageChangeHandler = (num) => {
    dispatch(todoActions.setCurrentPage(num));
    refetch({ page: num, pageSize: 3, searchKeyword });
  };

  const onPrevPageChangeHandler = () => {
    dispatch(todoActions.setCurrentPage(currentPage - 1));
    refetch({ page: currentPage - 1, pageSize: 3, searchKeyword });
  };

  const onNextPageChangeHandler = () => {
    dispatch(todoActions.setCurrentPage(currentPage + 1));
    refetch({ page: currentPage + 1, pageSize: 3, searchKeyword });
  };

  const onSignOutHandler = () => {
    Cookies.remove("token");
    dispatch(todoActions.setTodos([]));
    dispatch(todoActions.setSearchKeyword(""));
    dispatch(todoActions.setCurrentPage(1));
    router.replace("/");
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between w-full">
            <h1 className="font-semibold text-base">My todos</h1>
            <button
              className="text-[14px] text-custom-black hover:text-custom-pink"
              onClick={onSignOutHandler}
            >
              Sign Out
            </button>
          </div>
          <InputField
            type="text"
            placeholder="create a todo..."
            onChange={onInputFieldChangeHandler}
            value={todoInput}
          />
          <div className="flex gap-x-4 w-full">
            <SearchForm />
            <Button isPrimary={false} onClick={onTodoAddHandler}>
              Create
            </Button>
          </div>
          <div className="bg-custom-off-white w-full p-4 rounded-xl shadow-md items-center justify-center">
            {loading ? (
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-4 bg-slate-200 rounded"></div>
                  <div class="h-4 bg-slate-200 rounded"></div>
                  <div class="h-4 bg-slate-200 rounded"></div>
                </div>
              </div>
            ) : (
              <TodosList todos={todos.todos ? todos.todos : todos} />
            )}
            {todos.totalPage > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPage={todos.totalPage}
                onPageChange={onPageChangeHandler}
                onPrevPageChange={onPrevPageChangeHandler}
                onNextPageChange={onNextPageChangeHandler}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TodoPage;
