import { useSelector } from "react-redux";
import { Header } from "./header/Header";
import { SideBar } from "./sidebar/SideBar";
import { Main } from "./main/Main";
import { Footer } from "./footer/Footer";

export function AppLayout() {
  const taskList = useSelector((state) => state.todo);
  const taskWatchList = taskList.filter((task) => task.status === true);
  const watchListNumItems = taskWatchList.length;
  const completedNumItems = taskList.reduce(
    (acc, task) => acc + (task.status === false ? 1 : 0),
    0
  );

  return (
    <div className="bg-[#f9f8ff] max-w-[120rem]	mx-3 h-screen  grid-rows-[1fr_auto_7fr] grid grid-cols-[1fr_6fr] 100dvh gap-3 ">
      <Header
        watchListNumItems={watchListNumItems}
        completedNumItems={completedNumItems}
      ></Header>
      <SideBar></SideBar>
      <Main></Main>

      <Footer></Footer>
    </div>
  );
}
