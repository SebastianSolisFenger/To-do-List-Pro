/**
 * @jest-environment jsdom
 */

import TasksBluePrint from './tasks-functionality.js';

document.body.innerHTML = `
<div class="entry-line title-list">
  <p>Today's ToDo List</p>
  <button type="button" class="list-btn">
    <i class="fa-solid fa-arrows-rotate"></i>
  </button>
</div>
<div class="entry-line">
  <form id="add-task-form">
    <input class="input-new-task" required placeholder="Add to your list.." />
    <button type="submit" class="list-btn add-task-btn">
      <i class="fa-solid fa-plus"></i>
    </button>
  </form>
</div>
<div id="tasks-div">
  <!-- Add Todos Automatically -->
</div>
<div class="entry-line clear-task-line">
  <button id="remove-completed-btn" type="button">Clear all completed</button>
</div> 
`;

describe('add and remove', () => {
  window.localStorage = Storage.prototype;
  test('Add task', () => {
    const todoList = new TasksBluePrint();
    const newTodo = {
      id: '1',
      description: 'task1',
      completed: false,
      index: 1,
    };
    const newTodo2 = {
      id: '2',
      description: 'task2',
      completed: false,
      index: 2,
    };
    todoList.add(newTodo);
    expect(todoList.tasksArr).toHaveLength(1);
    todoList.add(newTodo2);
    expect(todoList.tasksArr).toHaveLength(2);
    expect(todoList.tasksArr[1].description).toBe('task2');
  });

  test('remove task', () => {
    const todoList = new TasksBluePrint();
    const newTodo = {
      id: '3',
      description: 'task3',
      completed: false,
      index: 3,
    };
    todoList.add(newTodo);
    todoList.remove(newTodo.id);
    expect(todoList.tasksArr[1].description).toBe('task2');
    expect(todoList.tasksArr).toHaveLength(2);
  });
});
