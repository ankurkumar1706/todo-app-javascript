"use strict";

// Initial empty array to store todos
let allTasks = [];

// Function to add a new todo
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    allTasks.push(taskText);
    taskInput.value = ""; // Clear the input field
  }
  console.log(allTasks);
};

// task create on button click
document.getElementById("addTaskBtn").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
