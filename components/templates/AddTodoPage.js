import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { GrAddCircle } from "react-icons/gr";
import AddTodoFrom from "@/modules/AddTodoFrom";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

const AddTodoPage = async () => {
  const session = await getServerSession(authOption);
  console.log(session)
  if (!session) redirect("/signin");
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
