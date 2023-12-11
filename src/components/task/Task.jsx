import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { completeTask, deleteTask, updateTask } from "../todoSlice";

export function Task({ task, className }) {
  const dispatch = useDispatch();
  const [duedate, setDuedate] = useState(task.duedate);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [isEditing, setIsEditing] = useState(false);

  let style = "";
  if (className === "todowatchlist") {
    style = " bg-[#e7f5ff] hover:bg-[#698DBE]";
  } else {
    style = " bg-[#dee2e6] hover:bg-[#adb5bd]";
  }

  if (isEditing) style = " bg-[#698DBE] ";

  function handleUpdate(e) {
    e.preventDefault();
    const updatedData = {
      id: task.id,
      duedate: duedate,
      description: description,
      priority: priority,
      status: task.status,
    };
    dispatch(updateTask(updatedData));
    setIsEditing(false);
  }

  function handleToggleCompleted(e, id) {
    e.preventDefault();
    dispatch(completeTask(id));
  }

  function handleDelete(id) {
    dispatch(deleteTask(id));
  }

  function handleCancel(e) {
    e.preventDefault();
    setDuedate(task.duedate);
    setDescription(task.description);
    setPriority(task.priority);

    setIsEditing(false);
  }

  function handleEditing() {
    setIsEditing((isEditing) => !isEditing);
  }
  return (
    <li className="relative cursor-default">
      <button
        onClick={() => handleDelete(task.id)}
        className=" h-6 w-6  bg-[#d0ebff] top-0 end-0 absolute hover:bg-red-400 "
      >
        <HiOutlineXMark />
      </button>

      <form
        onSubmit={handleUpdate}
        className={`py-6 grid grid-cols-10 items-center justify-items-center px-5 gap-5 rounded-[5px]  hover:text-white ${style}`}
      >
        <input
          type="date"
          disabled={!isEditing}
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
          className="border-b border-[#f9f8ff] text-lg block w-full text-slate-700 
              hover:date:bg-violet-100 rounded-[3px] text-center date:mr-4 date:py-3 date:px-4
              date:rounded-full date:border-0
              date:text-lg	 date:font-semibold
              date:bg-violet-50 date:text-violet-70  date:text-slate-700"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isEditing}
          className="col-span-7 text-slate-700 justify-self-stretch border-b border-[#f9f8ff] px-5 py-3 rounded-[3px] text-xl "
        />

        <select
          name="priority"
          id="priority"
          disabled={!isEditing}
          className="col-start-9 text-slate-700 justify-self-stretch border-b border-[#f9f8ff] text-center py-3 rounded-[3px] text-lg "
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="" disabled>
            Select...
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {className === "todowatchlist" && !isEditing ? (
          <div className="flex flex-col gap-[15px] col-end-11 text-2xl">
            <button
              className="border border-[#1864ab] rounded-[3px]  w-fit hover:border border-white hover:bg-slate-700"
              onClick={(e) => handleToggleCompleted(e, task.id)}
            >
              <HiOutlineCheckCircle />
            </button>
            <button
              className="border border-[#1864ab] rounded-[3px]  w-fit hover:border border-white hover:bg-slate-700"
              onClick={handleEditing}
            >
              <HiOutlinePencilSquare />
            </button>
          </div>
        ) : (
          !isEditing && (
            <button
              onClick={(e) => handleToggleCompleted(e, task.id)}
              className="border border-[#1864ab] rounded-[3px]  w-fit hover:border border-white hover:bg-orange-600 p-3 bg-orange-300"
            >
              Undo
            </button>
          )
        )}
        {isEditing && (
          <div className="flex flex-col gap-[15px] col-end-11 text-lg">
            <button className="bg-orange-600 block text-white px-2 py-1 rounded-[3px] hover:bg-orange-500">
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-stone-600 block text-white px-2 py-0 rounded-[3px] hover:bg-orange-500"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </li>
  );
}
