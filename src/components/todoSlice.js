import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 4210,
    duedate: "2024-01-01",
    description: "Learn React!",
    status: true, // "true: Tasks on-hand,  false: completed tasks
    priority: "Low",
  },
  {
    id: 41253,
    duedate: "2024-01-02",
    description: "Learn TypeScript",
    status: true, // "true: Tasks on-hand,  false: completed tasks
    priority: "High",
  },
  {
    id: 12101,
    duedate: "2024-01-03",
    description: "Review .NetCore",
    status: true, // "true: Tasks on-hand,  false: completed tasks
    priority: "Medium",
  },
  {
    id: 156842,
    duedate: "2024-01-04",
    description: "Find a job",
    status: true, // "true: Tasks on-hand,  false: completed tasks
    priority: "Low",
  },
  {
    id: 54125,
    duedate: "2024-01-05",
    description: "become senior IT developer",
    status: true, // "true: Tasks on-hand,  false: completed tasks
    priority: "High",
  },
  {
    id: 153783,
    duedate: "2023-12-01",
    description: "CPA qualified",
    status: false, // "true: Tasks on-hand,  false: completed tasks
    priority: "Medium",
  },
  {
    id: 153783,
    duedate: "2023-07-01",
    description: "TAFE NSW - programming",
    status: false, // "true: Tasks on-hand,  false: completed tasks
    priority: "Medium",
  },
];

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    updateTask(state, action) {
      const existingObject = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingObject) {
        Object.assign(existingObject, action.payload);
      }
    },
    addNew(state, action) {
      state.push(action.payload);
    },
    deleteTask(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },

    completeTask(state, action) {
      const a = state.map((item) =>
        item.id === action.payload ? { ...item, status: !item.status } : item
      );
      console.log(a);
      return a;
    },
  },
});

export const { addNew, updateTask, deleteTask, completeTask } =
  todoSlice.actions;

export default todoSlice.reducer;
