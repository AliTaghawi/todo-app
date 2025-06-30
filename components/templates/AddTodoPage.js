import { GrAddCircle } from "react-icons/gr";
import AddTodoFrom from "@/modules/AddTodoFrom";

const AddTodoPage = () => {
  return (
    <div>
      <h2 className="flex items-center gap-1.5 font-bold text-xl">
        <GrAddCircle /> Add New Todo
      </h2>
      <AddTodoFrom />
    </div>
  );
};

export default AddTodoPage;
