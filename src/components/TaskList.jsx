import TaskItem from "./TaskItem";

const TaskList = ({allTasks}) => {

  return (
    <div className="space-y-6">
      {allTasks.map((task, index) => (
        <div key={index}>
          <TaskItem
            date={task.task_date}
            description={task.task_msg}
            id={task.id}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
