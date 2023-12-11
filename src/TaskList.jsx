import { Task } from "./Task";

//===============================================================
export function TaskList({ taskList, className }) {
  return (
    <ul className="flex flex-col gap-4">
      {taskList.map((task) => (
        <Task task={task} className={className} key={task.id}></Task>
      ))}
    </ul>
  );
}
