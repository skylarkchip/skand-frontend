import React from "react";
import dynamic from "next/dynamic";

// Components
const TodoPage = dynamic(() =>
  import("@/components/page/todo/todo-page.component")
);

const Todo = () => {
  return <TodoPage />;
};

export default Todo;
