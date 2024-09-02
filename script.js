"use strict";

// Initial empty array to store tasks
let allTasks = [];

// Load tasks from localStorage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("allTasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => {
      allTasks.push(task);
    });
    updateTaskList(); // Update the task list after loading stored tasks
    updateStats(); // Update stats after loading stored tasks
  }
});

// Function to save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
};

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Store the task as an object with a `text` and `completed` property
    allTasks.push({ text: taskText, completed: false });
    taskInput.value = ""; // Clear the input field
    updateTaskList();
    updateStats();
    saveTasks(); // Save tasks after adding a new one
  }
  console.log(allTasks);
};

// Function to toggle task completion status
const toggleTaskCompleted = (index) => {
  allTasks[index].completed = !allTasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks(); // Save tasks after toggling completion
};

// Function to delete a task
const deleteTask = (index) => {
  allTasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks(); // Save tasks after deleting one
};

// Function to edit a task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = allTasks[index].text;

  allTasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks(); // Save tasks after editing one
};

// Function to update Stats
const updateStats = () => {
  const completeTask = allTasks.filter((task) => task.completed).length;
  const totalTasks = allTasks.length;
  const progress = totalTasks > 0 ? (completeTask / totalTasks) * 100 : 0;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "statNumbers"
  ).innerText = `${completeTask} / ${totalTasks}`;

  // Confetti blast condition
  if (totalTasks > 0 && completeTask === totalTasks) {
    blastConfetti();
  }
};

// Function to update task list
const updateTaskList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  allTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div
            class="task-item flex items-center justify-between gap-4 bg-white px-4 py-2 rounded mb-4"
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

// Confetti blast function
const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
