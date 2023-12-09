import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import {
  HiMiniPlusCircle,
  HiXCircle,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiDocumentCheck,
  HiArchiveBoxXMark,
  HiMiniQueueList,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";
function App() {
  const todoList = useSelector((state) => state.todo);
  const todoWatchList = todoList.filter((todo) => todo.status === "Pending");
  const completedList = todoList.filter((todo) => todo.status === "Completed");
  // return <AppLayout></AppLayout>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate replace to="todolist" />} />
          <Route
            path="todolist"
            element={<Main todos={todoWatchList}></Main>}
          />
          <Route
            path="completed"
            element={<Main todos={completedList}></Main>}
          />
        </Route>
        {/* <Route path="/" element={<AppLayout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function AppLayout() {
  // const page = useEffect(
  //   function () {
  //     if (currentPage) {
  //       const todoList = useSelector((state) => state.todo);
  //     }
  //     if (!currentPage) {
  //       const todoList = useSelector((state) => state.todo.status==="completed");
  //   },
  //   [currentPage]
  // );

  const todoList = useSelector((state) => state.todo);
  const todoWatchList = todoList.filter((todo) => todo.status === "Pending");
  const completedList = todoList.filter((todo) => todo.status === "Completed");
  const watchListNumItems = todoWatchList.length;
  const completedNumItems = todoList.reduce(
    (acc, todo) => acc + (todo.status === "Completed" ? 1 : 0),
    0
  );

  console.log(todoList[0].status);
  console.log(completedNumItems);
  console.log(todoList.length);
  //cl
  console.log(todoList);
  console.log(completedList);

  return (
    <div className="bg-[#f9f8ff] max-w-[120rem]	mx-3 h-screen  grid-rows-[1fr_auto_7fr] grid grid-cols-[1fr_6fr] 100dvh gap-3 ">
      <Header
        watchListNumItems={watchListNumItems}
        completedNumItems={completedNumItems}
      ></Header>
      <SideBar></SideBar>
      {/* <Main todos={todoWatchList}></Main> */}
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

function Header({ watchListNumItems, completedNumItems }) {
  return (
    <header className="h-[12rem] w-auto text-[3rem] text-center bg-[#1864ab] content-center text-white">
      <p className="mt-[5%] ">
        You currently have {watchListNumItems} tasks on-hand
      </p>
    </header>
  );
}

function SideBar() {
  return (
    <aside className="row-start-1 row-span-4	bg-[#e7f5ff]  ">
      <div className="text-[10rem] mt-[2rem] mx-auto block ">
        <span className="mx-auto block text-[#1864ab] flex justify-center items-end mt-[5rem] mb-[7rem] divide-y border-b pb-[2rem]">
          {/* <HiClipboardDocumentCheck /> */}
          <HiDocumentCheck />
          {/* <HiCog6Tooth /> */}
        </span>
      </div>
      <div className="divide-y-8 divide-gray-400"></div>

      <div className="flex flex-col text-[2rem] gap-[3rem] items-center  ">
        <div className="">
          <NavLink to="todolist">
            <span className="flex gap-[1rem] cursor-pointer hover:bg-[#698DBE] p-[1rem] rounded-[3px] hover:text-[white] items-center">
              <HiMiniQueueList /> To-Do List
            </span>
          </NavLink>
        </div>
        <NavLink to="completed">
          <span className="flex gap-[1rem] cursor-pointer hover:bg-[#698DBE] p-[1rem] rounded-[3px] hover:text-[white] items-center">
            <HiArchiveBoxXMark /> Completed
          </span>
        </NavLink>
      </div>
    </aside>
  );
}

//================================================================
// function Main({ todos }) {
//   return (
//     <>
//       {" "}
//       <header>
//         <div className="mx-[2rem] ">
//           <div className="bg-[#845ef7] grid grid-cols-10 justify-around h-[3rem] text-2xl  bg-[#845ef7] grid grid-cols-10 items-center justify-items-center px-5 gap-5 rounded-[5px] hover:bg-[#7048e8] ">
//             <div>Due Date</div>
//             <div className="">Description</div>
//             <div className="col-end-10">priority</div>
//           </div>
//         </div>
//       </header>
//       <div className="bg-[#f9f8ff] rounded-[9px] text-[#f9f8ff] ">
//         <main className="overflow-y-scroll scrollbar-hide">
//           <TaskList todos={todos}></TaskList>
//         </main>
//       </div>
//     </>
//   );
// }

//================================================================
function Main({ todos }) {
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
        <TaskList todos={todos}></TaskList>
      </main>
    </>
  );
}

//===============================================================
function TaskList({ todos }) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <Task todo={todo} key={todo.id}></Task>
      ))}
    </ul>
  );
}

function Task({ todo }) {
  return (
    <li className="relative cursor-default	">
      <form></form>
      <button className=" h-6 w-6  bg-[#d0ebff] top-0 end-0 absolute hover:bg-red-400">
        <HiOutlineXMark />
      </button>
      <div className="py-6 bg-[#e7f5ff] grid grid-cols-10 items-center justify-items-center px-5 gap-5 rounded-[5px] hover:bg-[#698DBE] hover:text-white">
        <span
          value={todo.duedate}
          className="border-b border-[#f9f8ff] px-8 py-3 
          hover:bg-yellow-300 rounded-[3px] text-center text-xl hover:bg-slate-400"
        >
          test
        </span>

        <p
          value={todo.description}
          className="col-span-7 justify-self-stretch border-b border-[#f9f8ff] px-8 py-3 rounded-[3px] text-2xl hover:bg-slate-400"
        >
          {todo.description}
        </p>
        <span
          className="col-start-9 justify-self-stretch border-b border-[#f9f8ff] px-8 py-3 rounded-[3px] text-2xl hover:bg-slate-400"
          value={todo.priority}
        >
          {todo.priority}
        </span>
        <div className="flex flex-col gap-[15px] col-end-11 text-2xl">
          <button className="border border-[#1864ab] rounded-[3px] py-1 px-2 w-fit hover:border border-white hover:bg-slate-400">
            <HiOutlineCheckCircle />
          </button>
          <button className="border border-[#1864ab] rounded-[3px] px-1 w-fit hover:border border-white hover:bg-slate-400">
            <HiOutlineDocumentDuplicate />
          </button>
        </div>
      </div>
    </li>
  );
}

//================================================================
function Footer({}) {
  const [isAdding, setIsAdding] = useState(false);

  function handleAddToggle(e) {
    e.preventDefault();
    setIsAdding((isAdding) => !isAdding);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsAdding(false);
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
          <form className="py-6 grid grid-cols-10 items-center justify-items-center px-5 gap-5 rounded-[5px] text-slate-500 ">
            <input
              type="date"
              disabled={false}
              className="border-b border-[#f9f8ff] text-lg	 block w-full text-slate-500 
              hover:date:bg-violet-100 rounded-[3px] text-center date:mr-4 date:py-2 date:px-4
              date:rounded-full date:border-0
              date:text-lg	 date:font-semibold
              date:bg-violet-50 date:text-violet-70  date:text-slate-500"
            />

            <input
              disabled={false}
              placeholder="Task details..."
              className="col-span-7 justify-self-stretch border-b border-[#f9f8ff] px-8 py-3 rounded-[3px] text-2xl text-slate-500 "
            />
            <select
              name="cars"
              id="cars"
              placeholder="Please Select"
              className="rounded-[3px]"
            >
              <option value="" disabled selected>
                Select...
              </option>
              <option value="H">High</option>
              <option value="M">Medium</option>
              <option value="L">Low</option>
            </select>

            <button
              onClick={handleSubmit}
              className="bg-orange-600 block text-white px-2 py-2 rounded-[3px] hover:bg-orange-500"
            >
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
