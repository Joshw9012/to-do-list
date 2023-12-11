import { Outlet } from "react-router-dom";

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
