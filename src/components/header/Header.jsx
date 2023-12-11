import { useLocation } from "react-router-dom";

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
