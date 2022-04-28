import './style.css';
import TasksBluePrint from './tasks-functionality.js';

const copyTasksBluePrint = new TasksBluePrint();

const tasksContainers = document.getElementById('tasks-div');

const createDynamicTasks = () => {
  tasksContainers.innerHTML = `
   <div class="entry-line title-list">
        <p>Today's ToDo List</p>
        <button type="button" class="list-btn">
          <i class="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <div class="entry-line">
        <form id="add-task-form">
          <input
            class="input-new-task"
            required
            placeholder="Add to your list.."
          >
          <button type='submit' class='list-btn add-task-btn'><i class='fa-solid fa-plus'></i></button>
        </form>
      </div>`;

  if (copyTasksBluePrint.tasksArr.length !== 0) {
    tasksContainers.innerHTML += copyTasksBluePrint.tasksArr
      .sort((a, b) => a.index - b.index)
      .map(
        (
          task,
        ) => `<div class='entry-line task-item-line'><div class='inside-list-container'><input class='task-status' data-id='${
          task.index
        }' type='checkbox' ${
          task.completed ? 'checked' : ''
        }><p class='task-description' id="desc${
          task.index
        }" contenteditable='true' data-tid='${task.index}'>${
          task.description
        }</p>
          </div>
          <button type='button' data-taskid='${task.index}' id='delete${
  task.index
}' class='list-btn remove-btn'><i class='fa-solid fa-trash-can'></i></button>
          </div>`,
      )
      .join('');
    tasksContainers.innerHTML
      += '<div class="entry-line clear-task-line"><button id="remove-completed-btn" type="button">Clear all completed</button></div>';

    const taskDescriptions = document.querySelectorAll('.task-description');
    const deleteBtns = document.querySelectorAll('.remove-btn');

    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        copyTasksBluePrint.remove(btn.dataset.taskid);
        createDynamicTasks();
      });
    });

    const taskStatusesInfo = document.querySelectorAll('.task-status');

    taskStatusesInfo.forEach((status) => {
      status.addEventListener('change', () => {
        copyTasksBluePrint.changeStatus(status.dataset.id, status.checked);
        taskDescriptions.forEach((desc) => {
          if (desc.dataset.tid === status.dataset.id) {
            desc.classList.add('task-line-through');
            desc.style = 'color: red;';
          }
        });
        createDynamicTasks();
      });
    });

    const deleteCompletedBtn = document.getElementById('remove-completed-btn');

    deleteCompletedBtn.addEventListener('click', () => {
      copyTasksBluePrint.removeCompletedTasks();
      createDynamicTasks();
    });

    taskDescriptions.forEach((taskObjItem) => {
      taskObjItem.addEventListener('keyup', () => {
        copyTasksBluePrint.update(
          taskObjItem.dataset.tid,
          taskObjItem.textContent,
        );
      });
      taskObjItem.addEventListener('focus', () => {
        taskObjItem.parentElement.parentElement.style = 'background-color: rgb(255 234 99)';
      });
      taskObjItem.addEventListener('blur', () => {
        taskObjItem.parentElement.parentElement.style = 'background-color: #fff';
      });
    });
  }

  const submitTaskForm = document.getElementById('add-task-form');
  const newTask = document.querySelector('.input-new-task');

  submitTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const upcomingtask = {
      description: newTask.value,
      completed: false,
      index: copyTasksBluePrint.funcSize() + 1,
    };
    copyTasksBluePrint.add(upcomingtask);
    newTask.value = '';
    createDynamicTasks();
  });
};

window.onload = createDynamicTasks();
