import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 4210,
    duedate: "2024-01-01",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Pending", // "Pending, completed
    priority: "Low",
  },
  {
    id: 41253,
    duedate: "01-02-2024",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Completed", // "Pending, completed
    priority: "High",
  },
  {
    id: 12101,
    duedate: "01-03-2024",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Pending", // "Pending, completed
    priority: "Medium",
  },
  {
    id: 156842,
    duedate: "2024-01-01",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Pending", // "Pending, completed
    priority: "Low",
  },
  {
    id: 54125,
    duedate: "01-02-2024",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Completed", // "Pending, completed
    priority: "High",
  },
  {
    id: 153783,
    duedate: "01-03-2024",
    description: "lorem ipsum dolor sit amet, consectetur adip",
    status: "Pending", // "Pending, completed
    priority: "Medium",
  },
];

const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    update(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateName } = todoSlice.actions;
export default todoSlice.reducer;
