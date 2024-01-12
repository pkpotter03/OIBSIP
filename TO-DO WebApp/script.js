document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
      var task = {
        text: taskText,
        addedDate: new Date(),
        completed: false,
        completedDate: null
      };
      var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));

      taskInput.value = '';

      loadTasks();
    }
  }

  function loadTasks() {
    var pendingTasksList = document.getElementById('pendingTasks');
    var completedTasksList = document.getElementById('completedTasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task, index) {
      var li = document.createElement('li');
      li.innerHTML = task.text;

      var button = document.createElement('button');
      button.innerHTML = task.completed ? 'Delete' : 'Complete';
      button.className = task.completed ? 'complete' : '';
      button.onclick = function () {
        toggleTask(index);
      };

      li.appendChild(button);

      if (task.completed) {
        completedTasksList.appendChild(li);
      } else {
        pendingTasksList.appendChild(li);
      }
    });
  }

  function toggleTask(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks[index].completed) {
      tasks.splice(index, 1);
    } else {
      tasks[index].completed = !tasks[index].completed;

      if (tasks[index].completed) {
        tasks[index].completedDate = new Date();
      } else {
        tasks[index].completedDate = null;
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();
  }