import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    isFormOpen: false,
    formType: "",
    allTasks: [],
    formData: {
      taskDescription: "",
      taskDate: "",
      taskTime: "",
      userId: "",
      username: '',
      taskId: "",
    },
  },
  reducers: {
    showForm: (state) => {
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
    clearForm: (state) => {
      state.formData = {
        taskDescription: "",
        taskDate: "",
        taskTime: "",
        userId: "",
        taskId: "",
      };
    },
    setFormData: (state, action) => {
      if (action.payload) {
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  showForm,
  closeForm,
  clearForm,
  setFormData,
  setFormType,
} = taskSlice.actions;
export default taskSlice.reducer;
