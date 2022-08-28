import toast from "react-hot-toast";

const taskAdded = () => toast.success("Task added successfuly");

const taskUpdated = () => toast.success("Task updated successfuly");

const taskDeleted = () => toast.success("Task deleted successfuly");

const taskError = () => toast.error("Something went wrong");

export { taskAdded, taskUpdated, taskDeleted, taskError };
