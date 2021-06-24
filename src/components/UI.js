function inputDateToStringFormat(str) {
  /* Take string in format YYYY-MM-dd and convert to  M/d/YY */
  let dateObj = new Date(str);
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getFullYear();
  return `${month}/${day}/${year.toString().slice(2)}`;
}

const UI = (storage) => {
  const navbar = document.getElementById("navbar");
  const dashboard = document.getElementById("dashboard");
  const mainPanel = document.getElementById("main-panel");

  let projectList;

  function initialize() {
    projectList = storage.getProjects();
    // check for stored data
    // if exists, build it
    // setup event listeners
    applyEventHandlers();
    // addTaskListHTML(taskList);
    appendProjectList(projectList);

    // open inbox as default project
    populateMainPanel(projectList.getProjectById("inbox"));
  }

  function buildTask({ title, note, dueDate, priority, id, complete, project }) {
    let color = priority == "high" ? "red" : priority == "medium" ? "yellow" : "blue";

    let html = `
    <div data-id=${id} class="group task flex justify-between shadow-sm my-2 p-2 px-4 rounded border border-${color}-100 hover:bg-${color}-50">
      <div class="left flex items-center">
        <input type="checkbox" class="cursor-pointer" />
        <span class="px-4">${title}</span>
        ${note == "" || note == null ? "" : '<i class="far fa-comment"></i>'}
      </div>
      <div class="right flex items-center">
        <span class="px-4">${dueDate == "" || dueDate == null ? "" : inputDateToStringFormat(dueDate)}</span>
        <i class="far fa-trash-alt opacity-0 group-hover:opacity-100 cursor-pointer"></i>
      </div>
    </div>
    `;
    return html;
  }

  function buildProject(project) {
    return `<li data-projectId=${project._id} class="hover:bg-gray-50 ml-8">${project.name}</li>`;
  }

  function populateMainPanel(project) {
    mainPanel.dataset.currentProjectId = project._id;
    const titleEl = document.querySelector("#main-panel > h5");
    titleEl.textContent = project.name;

    const taskBoxEl = document.querySelector("#task-box");

    let html = ``;

    project.getAllTasks().forEach((task) => {
      html += buildTask(task);
    });

    taskBoxEl.innerHTML = html;
  }

  function appendProjectList(projects) {
    // from task list, extract all project names
    // Inbox, Today, and This Week will always be present
    // Inbox = seperate, always present project
    // Today = tasks due today no matter the project
    // This Week = tasks due this week no matter the project
    const ul = document.querySelector("#user-projects");
    let html = ``;

    projects.getAllProjects().forEach((project) => {
      if (project._id == "inbox") return;
      html += buildProject(project);
    });

    ul.innerHTML = html;
  }

  // Event handlers & UI Event Functions

  function handleNavbarClicks(e) {
    // change the mainPanel display to show selected project (if it's the one already showing, do nothing)

    if (e.target.dataset.projectid || e.target.parentElement.dataset.projectid) {
      console.log(e.target);
      console.log(e.target.parentElement);
      // Clicked on a project
      let id = e.target.dataset.projectid || e.target.parentElement.dataset.projectid;
      populateMainPanel(projectList.getProjectById(id));
    }

    // ! Add handling for Inbox and Date Filters
  }

  function handleMainPanelClicks(e) {
    if (e.target.dataset.id || e.target.parentElement.parentElement.dataset.id) {
      // Clicked somewhere on task element
      if (e.target.classList.contains("fa-trash-alt")) {
        // Delete Task
        console.log("delete task");
      } else if (e.target.tagName == "INPUT") {
        // Complete Task
        console.log("complete task");
      } else {
        // Open modal with task info
        let projectId = mainPanel.dataset.currentProjectId;
        let taskId = e.target.dataset.id || e.target.parentElement.parentElement.dataset.id;

        let project = projectList.getProjectById(projectId);
        let task = project.getTaskById(taskId);
        populateModal(task);
        toggleModal();
      }
      // Handle exceptions for complete and delete clicks
    } else if (e.target.tagName == "BUTTON") {
      // Clicked on + Add New button
      populateModal({ id: null, title: "", note: "", dueDate: null, priority: "low" });
      // Open Modal
      // Default priority
      // Populate projects options
      //    Default to the current project
      toggleModal();
    }
  }

  function handleSaveModal(e) {
    e.preventDefault();
    console.log("save task changes");
    let info = getModalData();
    console.log(info);
    // required fields before saving
    if (info.taskTitle == "") {
      alert("Title cannot be blank");
      return;
    }
    if (info.taskId == "null") {
      // save a new task
      projectList.getProjectById(info.taskProjectId).addTask({
        title: info.taskTitle,
        note: info.taskNote,
        dueDate: info.taskDueDate,
        priority: info.taskPriority,
        project: info.taskProjectId,
      });
    } else {
      // save changes for current task
    }
    populateMainPanel(projectList.getProjectById(info.taskProjectId)); // re-render tasks
    toggleModal();
    clearModal();

    // ! compare to previous item, if same, do nothing, else save.
    // ! show toast when saved
  }

  function handleCancelModal(e) {
    e.preventDefault();
    toggleModal();
    clearModal();
  }

  function toggleModal() {
    const modal = document.querySelector(".modal");
    const app = document.querySelector("#app");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    app.classList.toggle("modal-active");
  }

  function populateModal(task) {
    const modalContainer = document.querySelector(".modal-container");
    const titleEl = document.querySelector("#task-title");
    const dateEl = document.querySelector("#task-due-date");
    const noteEl = document.querySelector("#task-note");
    const priorityEl = document.querySelector("#task-priority");
    const projectEl = document.querySelector("#task-project");

    modalContainer.dataset.taskId = task.id;
    titleEl.value = task.title;
    dateEl.value = task.dueDate;
    noteEl.value = task.note;
    priorityEl.value = task.priority;
    projectEl.innerHTML = "";

    // dynamically populate project options
    projectList.getAllProjects().forEach((project) => {
      projectEl.innerHTML += `
        <option value=${project._id} ${task.project == project.name ? "selected" : ""}>${project.name}</option>
      `;
    });
  }

  function getModalData() {
    const modalContainer = document.querySelector(".modal-container");
    const titleEl = document.querySelector("#task-title");
    const dateEl = document.querySelector("#task-due-date");
    const noteEl = document.querySelector("#task-note");
    const priorityEl = document.querySelector("#task-priority");
    const projectEl = document.querySelector("#task-project");

    return {
      taskId: modalContainer.dataset.taskId,
      taskTitle: titleEl.value,
      taskDueDate: dateEl.value,
      taskNote: noteEl.value,
      taskPriority: priorityEl.value,
      taskProjectId: projectEl.value,
    };
  }

  function clearModal() {
    const modalContainer = document.querySelector(".modal-container");
    const titleEl = document.querySelector("#task-title");
    const dateEl = document.querySelector("#task-due-date");
    const noteEl = document.querySelector("#task-note");
    const priorityEl = document.querySelector("#task-priority");
    const projectEl = document.querySelector("#task-project");

    delete modalContainer.dataset.taskId;
    titleEl.value = "";
    dateEl.value = "";
    noteEl.value = "";
    priorityEl.value = "";
    projectEl.innerHTML = "";
  }

  function applyEventHandlers() {
    /* Navbar */
    navbar.addEventListener("click", handleNavbarClicks);

    /* Main Panel */
    mainPanel.addEventListener("click", handleMainPanelClicks);

    /* Modal */
    document.querySelector("#open-modal").addEventListener("click", toggleModal);
    document.querySelector("#cancel-modal-btn").addEventListener("click", handleCancelModal);
    document.querySelector("#save-modal-btn").addEventListener("click", handleSaveModal);
    document.querySelector(".modal-overlay").addEventListener("click", handleCancelModal);
  }

  initialize();
};

export default UI;
