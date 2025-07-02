import EditTodoPage from "@/templates/EditTodoPage";

async function EditTodo(props) {
  const {todoId} = await props.params
  return <EditTodoPage todoId={todoId} />;
}

export default EditTodo;
