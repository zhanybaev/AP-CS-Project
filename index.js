const list = document.getElementsByClassName("list")[0];
const taskInp = document.getElementById("task-inp");
const descriptionInp = document.getElementById("description-inp");
const priorityInp = document.getElementById("priority-inp");
const dateInp = document.getElementById("date-inp");
const addBtn = document.getElementById("add-btn");

const todos = [
  {
    task: "Create files",
    description:"Make an folder structure and organize files on a computer to get to the needed files need as easy as possible.",
    priority: "high",
    complete: false,
    due: "2024-04-06",
    id: "43243242342",
  },
  {
    task: "UI Component",
    description: "Design User Interface, make it user friendly, and change the colors on the website",
    priority: "high",
    complete: true,
    due: "2024-04-06",
    id: "4324234234",
  },
  {
    task: "Find bags",
    description: "Complete the code and run it multiple times. Actively monitor everything that's happening as the program runs",
    priority: "low",
    complete: false,
    due: "2024-04-06",
    id: "543543656",
  },
];

function openTask(e, id) {
  document.getElementById(id).classList.toggle("open");
}

function filterTodos() {
  todos.sort((a, b) => {
    if (a.complete === b.complete) {
      if (a.priority === "high" && b.priority === "low") {
        return -1;
      } else if (a.priority === "low" && b.priority === "high") {
        return 1;
      } else {
        return 0;
      }
    } else {
      return a.complete - b.complete;
    }
  });
}

function removeTask(e, index) {
    todos.splice(index, 1)
    fetchTodos();
}

function fetchTodos() {
  list.innerHTML = "";
  filterTodos();
  todos.map((item, index) => {
    list.innerHTML += `
        <div id="${item.id}" class="task-card ${item.complete ? "completed" : ""} ${item.priority + "Priority"}">
            <div class="task-card__header">
                <svg onclick="removeTask(event, ${index})" fill="#000000" height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315 315" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 315 315">
                    <g>
                    <path d="m256.774,23.942h-64.836v-6.465c0-9.636-7.744-17.477-17.263-17.477h-34.348c-9.521,0-17.266,7.841-17.266,17.478v6.465h-64.835c-9.619,0-17.445,7.76-17.445,17.297v11.429c0,7.168 4.42,13.33 10.698,15.951 1.989,39.623 13.5,231.193 14.018,239.801 0.222,3.696 3.284,6.58 6.987,6.58h170.033c3.703,0 6.766-2.884 6.987-6.58 0.518-8.607 12.028-200.178 14.018-239.801 6.278-2.621 10.698-8.783 10.698-15.951v-11.43c5.68434e-14-9.537-7.826-17.297-17.446-17.297zm-119.713-6.464c0-1.918 1.465-3.478 3.266-3.478h34.348c1.8,0 3.264,1.56 3.264,3.478v6.465h-40.877v-6.465zm-82.282,23.761c0-1.818 1.546-3.297 3.445-3.297h198.549c1.899,0 3.445,1.478 3.445,3.297v11.429c0,1.819-1.546,3.299-3.445,3.299h-198.548c-1.899,0-3.445-1.479-3.445-3.299v-11.429zm181.143,259.761h-156.848c-2.055-34.247-11.479-191.674-13.51-231.033h183.867c-2.031,39.359-11.454,196.786-13.509,231.033z"/>
                    <path d="m157.5,95.125c-3.866,0-7,3.134-7,7v176.109c0,3.866 3.134,7 7,7 3.866,0 7-3.134 7-7v-176.109c0-3.866-3.134-7-7-7z"/>
                    <path d="m110.2,102.04c-0.202-3.86-3.507-6.837-7.355-6.625-3.86,0.201-6.827,3.494-6.625,7.355l9.182,175.829c0.195,3.736 3.285,6.635 6.984,6.635 0.123,0 0.247-0.003 0.371-0.01 3.86-0.201 6.827-3.494 6.625-7.355l-9.182-175.829z"/>
                    <path d="m212.155,95.415c-3.899-0.223-7.153,2.764-7.355,6.625l-9.184,175.829c-0.202,3.861 2.765,7.154 6.625,7.355 0.125,0.007 0.248,0.01 0.371,0.01 3.698,0 6.789-2.898 6.984-6.635l9.184-175.829c0.202-3.861-2.764-7.154-6.625-7.355z"/>
                    </g>
                </svg>
                <input onchange="completeTask(${item.id}, ${!item.complete})" ${item.complete ? "checked" : ""} id="doneInp" type="checkbox">
                <div>
                    <span onclick="openTask(event, ${item.id})" class="accordion-item-header-title">${item.task}</span>
                    <span class="accordion-item-header-priority">${item.priority} priority</span>
                </div>
            </div>
            <div class="task-card__wrapper">
                <div class="task-card__description">
                <hr>
                <p class='description'>${item.description}</p>
                <p class='due'>Due Date: ${item.due}</p>
                </div>
            </div>
        </div>
    `;
  });
}

function completeTask(targetId, value) {
  let indexChange;
  const elem = todos.find((elem, index) => {
    indexChange = index;
    return elem.id == targetId;
  });
  const obj = {
    ...elem,
    complete: value,
  };
  todos.splice(indexChange, 1, obj);
  fetchTodos();
}

function addTask() {
  const obj = {
    task: taskInp.value,
    description: descriptionInp.value,
    priority: priorityInp.value,
    complete: false,
    due: dateInp.value,
    id: Date.now().toString(),
  };
  if (!obj.task || !obj.priority || !obj.due) return;
  todos.push(obj);
  fetchTodos();
  taskInp.value=""
  descriptionInp.value=""
  priorityInp.value=""
  dateInp.value=""
}

addBtn.addEventListener("click", () => {
  addTask();
});

fetchTodos();
