import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  HiMiniPlusCircle,
  HiXCircle,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiDocumentCheck,
  HiArchiveBoxXMark,
  HiMiniQueueList,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import {
  addNew,
  completeTask,
  deleteTask,
  updateTask,
} from "./components/todoSlice";
import { AppLayout } from "./AppLayout";
function App() {
  const taskList = useSelector((state) => state.todo);
  const todoWatchList = taskList.filter((task) => task.status === true);
  const completedList = taskList.filter((task) => task.status === false);
  //cl

  // return <AppLayout></AppLayout>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate replace to="todolist" />} />
          <Route
            path="todolist"
            element={
              <TaskList
                taskList={todoWatchList}
                className={"todowatchlist"}
              ></TaskList>
            }
          />
          <Route
            path="completedlist"
            element={
              <TaskList
                taskList={completedList}
                className={"completedlist"}
              ></TaskList>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-4xl text-center">
                Page cannot be found... :(
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export function Header({ watchListNumItems, completedNumItems }) {
  const { pathname } = useLocation();

  return (
    <header className="h-[12rem] w-auto text-[3rem] text-center bg-[#1864ab] content-center text-white">
      <p className="mt-[5%] ">
        {pathname === "/completedlist" &&
          `You have completed ${completedNumItems} in total`}
        {pathname === "/todolist" &&
          `You currently have ${watchListNumItems} tasks on-hand...`}
      </p>
    </header>
  );
}

export function SideBar() {
  const { pathname } = useLocation();
  let style = "";
  style = " bg-[#1864ab] text-[white] ";

  return (
    <aside className="row-start-1 row-span-4	bg-[#e7f5ff]  ">
      <div className="text-[10rem] mt-[2rem] mx-auto block ">
        <span className="mx-auto block text-[#1864ab] flex justify-center  items-end mt-[5rem] mb-[7rem] divide-y border-b pb-[2rem]">
          <HiDocumentCheck />
        </span>
      </div>
      <div className="divide-y-8 divide-gray-400"></div>

      <div className="flex flex-col text-[2rem] gap-[3rem] items-center  ">
        <div className="">
          <NavLink to="todolist">
            <span
              className={`flex gap-[1rem] cursor-pointer  p-[1rem] rounded-[3px] hover:ring-2 hover:ring-[#698DBE]" items-center ${
                pathname === "/todolist" && style
              }`}
            >
              <HiMiniQueueList /> To-Do List
            </span>
          </NavLink>
        </div>
        <NavLink to="completedlist">
          <span
            className={`flex gap-[1rem] cursor-pointer  p-[1rem] rounded-[3px] hover:ring-2 hover:ring-[#698DBE]" items-center ${
              pathname === "/completedlist" && style
            }`}
          >
            <HiArchiveBoxXMark /> Completed
          </span>
        </NavLink>
      </div>
    </aside>
  );
}

//================================================================

//================================================================
export function Main() {
  return (
    <>
      <header className=" top-0  bg-[#1864ab] text-white py-4 ">
        <div className="grid grid-cols-10 text-2xl items-center justify-items-center px-5 gap-5 rounded-[5px]">
          <div>Due Date</div>
          <div className="col-start-2 col-span-7 border-x-2  justify-self-stretch p-auto px-5 gap-5">
            Description
          </div>
          <div className="col-end-10">Priority</div>
        </div>
      </header>

      <main className="overflow-y-scroll bg-[#f9f8ff] rounded-[9px] text-black no-scrollbar">
        <Outlet />
      </main>
    </>
  );
}

//===============================================================
function TaskList({ taskList, className }) {
  return (
    <ul className="flex flex-col gap-4">
      {taskList.map((task) => (
        <Task task={task} className={className} key={task.id}></Task>
      ))}
    </ul>
  );
}

function Task({ task, className }) {
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

//================================================================
export function Footer() {
  const [isAdding, setIsAdding] = useState(false);
  const [duedate, setDuedate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();

  function handleAddToggle(e) {
    e.preventDefault();
    setIsAdding((isAdding) => !isAdding);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsAdding(false);
    const newTask = {
      id: new Date().getTime().toString(),
      duedate,
      description,
      status: true,
      priority,
    };
    dispatch(addNew(newTask));

    setIsAdding(false);
    setDuedate("");
    setDescription("");
    setPriority("");
  }

  return (
    <footer className="bg-[#1864ab] col-start-2  text-2xl">
      {isAdding ? (
        <div className="h-[12rem] text-white">
          <div className=" flex justify-center items-center ">
            <span
              className="flex justify-center items-center hover:bg-[#698DBE] rounded-[3px] cursor-pointer text-white block px-4"
              onClick={handleAddToggle}
            >
              <HiXCircle />
              close
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="py-6 grid grid-cols-10 items-center justify-items-center px-5 gap-5 rounded-[5px] text-slate-500 "
          >
            <input
              type="date"
              value={duedate}
              disabled={false}
              onChange={(e) => setDuedate(e.target.value)}
              className="border-b border-[#f9f8ff] text-lg	 block w-full text-slate-500 
              hover:date:bg-violet-100 rounded-[3px] text-center date:mr-4 date:py-2 date:px-4
              date:rounded-full date:border-0
              date:text-lg	 date:font-semibold
              date:bg-violet-50 date:text-violet-70  date:text-slate-500"
            />

            <input
              value={description}
              disabled={false}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="TaskOnHand details..."
              className="col-span-7 justify-self-stretch border-b border-[#f9f8ff] px-8 py-3 rounded-[3px] text-2xl text-slate-500 "
            />
            <select
              name="priority"
              id="priority"
              placeholder="Please Select"
              className="rounded-[3px]"
              value={priority}
              disabled={false}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled selected>
                Select...
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button className="bg-orange-600 block text-white px-2 py-2 rounded-[3px] hover:bg-orange-500">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div onClick={handleAddToggle}>
          <div className="flex justify-center text-white  hover:bg-orange-600">
            <span className="flex justify-center  block cursor-pointer  p-[1.5rem]">
              <HiMiniPlusCircle />
              Add New
            </span>
          </div>
        </div>
      )}
    </footer>
  );
}
