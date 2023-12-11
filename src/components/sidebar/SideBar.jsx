import { NavLink, useLocation } from "react-router-dom";
import {
  HiDocumentCheck,
  HiArchiveBoxXMark,
  HiMiniQueueList,
} from "react-icons/hi2";

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
