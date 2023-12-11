import { useSelector } from "react-redux";
import { Header, SideBar, Main, Footer } from "./App";

export function AppLayout() {
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
  const taskList = useSelector((state) => state.todo);
  const taskWatchList = taskList.filter((task) => task.status === true);
  const completedList = taskList.filter((task) => task.status === false);
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
