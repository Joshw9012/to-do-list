import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiMiniPlusCircle, HiXCircle } from "react-icons/hi2";
import { addNew } from "../todoSlice";

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
