import EditTodoPage from "@/templates/EditTodoPage";

export const metadata = {
  title: "todo app | edit todo",
};


async function EditTodo(props) {
  const {todoId} = await props.params
  return <EditTodoPage todoId={todoId} />;
}

export default EditTodo;
