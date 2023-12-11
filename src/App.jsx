import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/AppLayout";
import { TaskList } from "./components/task/TaskList";
function App() {
  const taskList = useSelector((state) => state.todo);
  const todoWatchList = taskList.filter((task) => task.status === true);
  const completedList = taskList.filter((task) => task.status === false);

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
