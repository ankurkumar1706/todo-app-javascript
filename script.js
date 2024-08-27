"use strict";

// Initial empty array to store tasks
let allTasks = [];

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Store the task as an object with a `text` and `completed` property
    allTasks.push({ text: taskText, completed: false });
    taskInput.value = ""; // Clear the input field
    updateTaskList();
  }
  console.log(allTasks);
};

// Function to toggle task completion status
const toggleTaskCompleted = (index) => {
  allTasks[index].completed = !allTasks[index].completed;
  updateTaskList();
};

// Function to delete a task
const deleteTask = (index) => {
  allTasks.splice(index, 1);
  updateTaskList();
};

// Function to edit a task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = allTasks[index].text;

  allTasks.splice(index, 1);
  updateTaskList();
};

// Function to update task list
const updateTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  allTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div
            class="task-item flex items-center justify-between gap-4 bg-white px-4 py-2 rounded"
          >
          <div class="task flex items-center gap-4 ${
            task.completed ? "completed" : ""
          }">
            <input type="checkbox" ${task.completed ? "checked" : ""}/>
            <div class="taskText flex-1">${task.text}</div>
            </div>
            <div class="icons flex">
              <button class="w-9 p-2" onClick="editTask(${index})"><img src="edit.png" alt="Edit" /></button>
              <button class="w-9 p-2" onClick="deleteTask(${index})"><img src="delete.png" alt="Delete" /></button>
            </div>
          </div>`;
    listItem
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", () => toggleTaskCompleted(index));
    taskList.append(listItem);
  });
};

// Task create on button click
document.getElementById("addTaskBtn").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
