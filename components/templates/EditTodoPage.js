import AddTodoFrom from "@/modules/AddTodoFrom";
import { CiEdit } from "react-icons/ci";

const EditTodoPage = ({todoId}) => {
  return (
    <div>
      <h2 className="flex items-center gap-1.5 font-bold text-xl">
        <CiEdit className="text-2xl" /> Edit Todo
      </h2>
      <AddTodoFrom todoId={todoId}/>
    </div>
  );
};

export default EditTodoPage;