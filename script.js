"use strict";
// Initial empty array to store todos
let allTasks = [];

// Function to add a new todo
const addTask = () => {
  const taskInput = getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    allTasks.push(taskText);
    taskInput.value = ""; // Clear the input field

    renderTodos();
  }
  console.log(allTasks);
};
