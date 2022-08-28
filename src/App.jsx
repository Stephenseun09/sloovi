import { AiOutlinePlus } from "react-icons/ai";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllTasksQuery } from "./features/api/apiSlice";
import {
  setFormType,
  showForm,
} from "./features/tasks/tasksSlice";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllTasksQuery();

  const addNewTaskHandler = () => {
    dispatch(setFormType("add"));
    dispatch(showForm());
  };

  return (
    <main className="bg-[#cacacaa1]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-[600px] min-h-screen mx-auto px-4 py-16">
          <div className="flex justify-between w-full bg-gray-200 px-2 py-2 shadow-xl">
            <h1 className="text-black">Tasks {data.results?.length}</h1>
            <button onClick={addNewTaskHandler}>
              <AiOutlinePlus />
            </button>
          </div>
          <TaskForm />

          <TaskList allTasks={data.results} />
        </div>
      )}
      <Toaster />
    </main>
  );
}

export default App;
