import "./style.css";

const LISTFORM = document.querySelector(".list");
const LITASKCON = document.createElement("li");
const INPUT = document.createElement("input");
const SPAN = document.createElement("span");

const TASKSARR = [
  {
    description: "Clean the living room",
    completed: false,
    index: 0,
  },
  {
    description: "Wash the dishes",
    completed: false,
    index: 1,
  },
  {
    description: "Tidy my desktop",
    completed: false,
    index: 2,
  },
];

const DISPLAYTASKS = () => {
  TASKSARR.forEach((task) => {
    const LI_TASK_ITEM = LITASKCON.cloneNode(true);
    const CHECKBOX = INPUT.cloneNode(true);
    const INPUT_TEXT_CONTAINER = INPUT.cloneNode(true);
    const ICON = SPAN.cloneNode(true);
    console.log(ICON);

    LI_TASK_ITEM.classList.add("list__task__item", "icons");
    CHECKBOX.setAttribute("type", "checkbox");
    CHECKBOX.classList.add("list__checkbox");
    INPUT_TEXT_CONTAINER.setAttribute("type", "text");
    INPUT_TEXT_CONTAINER.setAttribute("name", "task");
    INPUT_TEXT_CONTAINER.setAttribute("value", task.description);
    INPUT_TEXT_CONTAINER.classList.add("list__input__text");
    ICON.classList.add("icons");
    ICON.innerText = "&#x022EE;";

    LI_TASK_ITEM.append(CHECKBOX, INPUT_TEXT_CONTAINER, ICON);
    LISTFORM.appendChild(LI_TASK_ITEM);
  });
};

DISPLAYTASKS();
