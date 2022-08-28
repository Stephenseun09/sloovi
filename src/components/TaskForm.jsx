import { useEffect, useState } from "react";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetAllUsersQuery,
  useUpdateTaskMutation,
} from "../features/api/apiSlice";

import { AiFillDelete } from "react-icons/ai";
import { getCurrentTimeZone } from "../utils/getTimeZone";
import { convertTimeToSecs } from "../utils/convertTimeToSecs";
import {
  clearForm,
  closeForm,
  setFormData,
} from "../features/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  taskAdded,
  taskDeleted,
  taskError,
  taskUpdated,
} from "../utils/alertMsg";

const TaskForm = () => {
  const [users, setUsers] = useState([]);
  const { formData, isFormOpen, formType } = useSelector((state) => state.task);
  const { taskDescription, taskDate, taskTime, userId, taskId } = formData;
  const dispatch = useDispatch();

  const { data: usersData, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.results.data);
    }
  }, [usersData]);

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleChange = (e) => {
    dispatch(
      setFormData({
        [e.target.name]: e.target.value,
      })
    );
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskDate || !taskDescription || !userId || !taskTime) {
      return;
    }

    const payload = {
      assigned_user: userId,
      task_date: taskDate,
      task_time: convertTimeToSecs(taskTime),
      is_completed: 0,
      time_zone: Math.floor(getCurrentTimeZone()),
      task_msg: taskDescription,
    };

    if (formType === "add") {
      addTask(payload).then((res) => {
        if (res.data.status === "success") {
          dispatch(clearForm());
          dispatch(closeForm());
          taskAdded();
        } else {
          taskError();
        }
      });
    } else if (formType === "edit") {
      const params = {task: payload, taskId}
      updateTask(params).then((res) => 
      {
        if (res.data.status === "success") {
          dispatch(clearForm());
          dispatch(closeForm());
          taskUpdated();
        } else {
          taskError();
        }
      });
    }
  };

  // close form
  const onClose = () => {
    dispatch(clearForm());
    dispatch(closeForm());
  };

  // delete task
  const deleteTaskHandler = () => {
    deleteTask(taskId).then((res) => {
      if (res.data.status === "success") {
        dispatch(clearForm());
        dispatch(closeForm());
        taskDeleted();
      } else {
        taskError();
      }
    });
  };

  return (
    <>
      {!isLoading && isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="task-form w-full bg-gray-200 transition-all duration-200 ease-linear origin-top shadow-xl"
        >
          <div className=" w-full flex flex-col justify-center p-2  mt-4">
            <label htmlFor="taskDescription">Task Description</label>
            <input
              required
              name="taskDescription"
              type="text"
              id="taskDescription"
              placeholder="Enter task description"
              className="w-full border-2 mt-3 p-2.5"
              onChange={handleChange}
              value={taskDescription}
            />
          </div>
          <div className=" w-full  p-3 flex ">
            <div className=" w-[45%]">
              <label htmlFor="taskDate" className="text-gray-700">
                Task Date
              </label>
              <input
                required
                name="taskDate"
                type="date"
                id="taskDate"
                className="w-full border-2 mt-3 p-2.5"
                onChange={handleChange}
                value={taskDate}
              />
            </div>
            <div className="w-[50%] flex justify-center flex-col ml-5">
              <label htmlFor="taskTime" className="text-gray-700">
                Task Time
              </label>
              <input
                required
                name="taskTime"
                type="time"
                id="taskTime"
                className="w-full border-2 mt-3 p-2.5"
                onChange={handleChange}
                value={taskTime}
              />
            </div>
          </div>
          <div className="p-3">
            <label htmlFor="task-assignee" className="text-gray-700">
              Assign User
            </label>
            <select
              required
              name="userId"
              id="task-assignee"
              className="w-full bg-white border-2 mt-3 p-2.5"
              onChange={handleChange}
              value={userId}
            >
              <option hidden value="">Select User</option>
              {users?.map((user) => (
                <option  key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`w-full flex items-center  ${
              formType === "edit" ? "justify-between" : "justify-end"
            } p-3`}
          >
            {formType === "edit" && (
              <div>
                <AiFillDelete
                  onClick={deleteTaskHandler}
                  className="ml-3 w-6 h-6 cursor-pointer"
                />
              </div>
            )}
            <div className="flex justify-end self-end">
              <button
                type="button"
                className="mr-3 px-5 py-2  text-gray-500 bg-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-task-btn mr-3 px-5 py-2 bg-green-700 text-white"
              >
                <span>{formType === "edit" ? "Save" : "Submit"}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default TaskForm;
