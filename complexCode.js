/*
Filename: complexCode.js

Description: This code is a complex implementation of a todo list application. It utilizes advanced JavaScript concepts such as closures, prototypes, higher-order functions, and event handling. 

Author: [Your Name]

Date: [Current Date]
*/

// TodoList class
function TodoList() {
  this.tasks = [];
}

// Task class
function Task(description, priority) {
  this.description = description;
  this.priority = priority;
  this.completed = false;
}

Task.prototype.complete = function () {
  this.completed = true;
};

// TodoList methods
TodoList.prototype.addTask = function (task) {
  this.tasks.push(task);
};

TodoList.prototype.removeTask = function (index) {
  this.tasks.splice(index, 1);
};

TodoList.prototype.getCompletedTasks = function () {
  return this.tasks.filter(function (task) {
    return task.completed === true;
  });
};

TodoList.prototype.getTasksByPriority = function (priority) {
  return this.tasks.filter(function (task) {
    return task.priority === priority;
  });
};

TodoList.prototype.sortTasksByPriority = function () {
  this.tasks.sort(function (a, b) {
    return a.priority - b.priority;
  });
};

// UI Controller
var UIController = (function () {
  var DOMElements = {
    addButton: document.querySelector("#add-button"),
    inputTask: document.querySelector("#input-task"),
    inputPriority: document.querySelector("#input-priority"),
    taskList: document.querySelector("#task-list"),
    completedTasks: document.querySelector("#completed-tasks"),
  };

  return {
    getDOMElements: function () {
      return DOMElements;
    },
    getNewTaskInputs: function () {
      return {
        description: DOMElements.inputTask.value,
        priority: DOMElements.inputPriority.value,
      };
    },
    clearNewTaskInputs: function () {
      DOMElements.inputTask.value = "";
      DOMElements.inputPriority.value = "";
    },
    displayTasks: function (tasks) {
      DOMElements.taskList.innerHTML = "";
      tasks.forEach(function (task) {
        var taskItem = document.createElement("li");
        taskItem.textContent = task.description;
        DOMElements.taskList.appendChild(taskItem);
      });
    },
    displayCompletedTasks: function (completedTasks) {
      DOMElements.completedTasks.innerHTML = "";
      completedTasks.forEach(function (task) {
        var taskItem = document.createElement("li");
        taskItem.textContent = task.description;
        DOMElements.completedTasks.appendChild(taskItem);
      });
    },
  };
})();

// App Controller
var AppController = (function (todoListCtrl, UICtrl) {
  var DOM = UICtrl.getDOMElements();

  var setupEventListeners = function () {
    DOM.addButton.addEventListener("click", addTask);
  };

  var addTask = function () {
    var newTaskInputs = UICtrl.getNewTaskInputs();

    if (newTaskInputs.description !== "" && newTaskInputs.priority !== "") {
      var newTask = new Task(
        newTaskInputs.description,
        parseInt(newTaskInputs.priority)
      );

      todoListCtrl.addTask(newTask);
      UICtrl.clearNewTaskInputs();
      updateTaskList();
    }
  };

  var updateTaskList = function () {
    var tasks = todoListCtrl.getTasksByPriority();
    UICtrl.displayTasks(tasks);
  };

  return {
    init: function () {
      setupEventListeners();
      updateTaskList();
    },
  };
})(TodoList, UIController);

// Initialize the app
AppController.init();