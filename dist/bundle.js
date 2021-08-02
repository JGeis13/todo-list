/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://todo-list/./src/styles/styles.css?");

/***/ }),

/***/ "./src/components/UI.js":
/*!******************************!*\
  !*** ./src/components/UI.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction inputDateToStringFormat(str) {\n  /* Take string in format YYYY-MM-dd and convert to  M/d/YY */\n  let dateObj = new Date(str);\n  let month = dateObj.getMonth() + 1;\n  let day = dateObj.getUTCDate();\n  let year = dateObj.getFullYear();\n  return `${month}/${day}/${year.toString().slice(2)}`;\n}\n\nconst UI = (storage) => {\n  const navbar = document.getElementById(\"navbar\");\n  const dashboard = document.getElementById(\"dashboard\");\n  const mainPanel = document.getElementById(\"main-panel\");\n\n  let projectList;\n\n  function initialize() {\n    projectList = storage.getProjects();\n    // check for stored data\n    // if exists, build it\n    // setup event listeners\n    applyEventHandlers();\n    // addTaskListHTML(taskList);\n    appendProjectList(projectList);\n\n    // open inbox as default project\n    populateMainPanel(projectList.getProjectById(\"inbox\"));\n  }\n\n  function buildTask({ title, note, dueDate, priority, id, complete, project }) {\n    let color = priority == \"high\" ? \"red\" : priority == \"medium\" ? \"yellow\" : \"blue\";\n\n    let html = `\n    <div data-id=${id} class=\"group task flex justify-between shadow-sm my-2 p-2 px-4 rounded border border-${color}-100 hover:bg-${color}-50\">\n      <div class=\"left flex items-center\">\n        <input type=\"checkbox\" class=\"cursor-pointer\" />\n        <span class=\"px-4\">${title}</span>\n        ${note == \"\" || note == null ? \"\" : '<i class=\"far fa-comment\"></i>'}\n      </div>\n      <div class=\"right flex items-center\">\n        <span class=\"px-4\">${dueDate == \"\" || dueDate == null ? \"\" : inputDateToStringFormat(dueDate)}</span>\n        <i class=\"far fa-trash-alt opacity-0 group-hover:opacity-100 cursor-pointer\"></i>\n      </div>\n    </div>\n    `;\n    return html;\n  }\n\n  function buildProject(project) {\n    return `<li data-projectId=${project._id} class=\"hover:bg-gray-50 ml-8\">${project.name}</li>`;\n  }\n\n  function populateMainPanel(project) {\n    mainPanel.dataset.currentProjectId = project._id;\n    const titleEl = document.querySelector(\"#main-panel > h5\");\n    titleEl.textContent = project.name;\n\n    const taskBoxEl = document.querySelector(\"#task-box\");\n\n    let html = ``;\n\n    project.getAllTasks().forEach((task) => {\n      html += buildTask(task);\n    });\n\n    taskBoxEl.innerHTML = html;\n  }\n\n  function appendProjectList(projects) {\n    // from task list, extract all project names\n    // Inbox, Today, and This Week will always be present\n    // Inbox = seperate, always present project\n    // Today = tasks due today no matter the project\n    // This Week = tasks due this week no matter the project\n    const ul = document.querySelector(\"#user-projects\");\n    let html = ``;\n\n    projects.getAllProjects().forEach((project) => {\n      if (project._id == \"inbox\") return;\n      html += buildProject(project);\n    });\n\n    ul.innerHTML = html;\n  }\n\n  // Event handlers & UI Event Functions\n\n  function handleNavbarClicks(e) {\n    // change the mainPanel display to show selected project (if it's the one already showing, do nothing)\n\n    if (e.target.dataset.projectid || e.target.parentElement.dataset.projectid) {\n      console.log(e.target);\n      console.log(e.target.parentElement);\n      // Clicked on a project\n      let id = e.target.dataset.projectid || e.target.parentElement.dataset.projectid;\n      populateMainPanel(projectList.getProjectById(id));\n    }\n\n    // ! Add handling for Inbox and Date Filters\n  }\n\n  function handleMainPanelClicks(e) {\n    if (e.target.dataset.id || e.target.parentElement.parentElement.dataset.id) {\n      // Clicked somewhere on task element\n      if (e.target.classList.contains(\"fa-trash-alt\")) {\n        // DELETE TASK\n        let projectId = e.target.parentElement.parentElement.parentElement.parentElement.dataset.currentProjectId;\n        let taskId = e.target.parentElement.parentElement.dataset.id;\n\n        projectList.getProjectById(projectId).deleteTaskById(taskId);\n\n        // re-render tasks after deletion\n        populateMainPanel(projectList.getProjectById(projectId));\n      } else if (e.target.tagName == \"INPUT\") {\n        // Complete Task\n\n        console.log(\"complete task\");\n      } else {\n        // Open modal with task info\n        let projectId = mainPanel.dataset.currentProjectId;\n        let taskId = e.target.dataset.id || e.target.parentElement.parentElement.dataset.id;\n\n        let project = projectList.getProjectById(projectId);\n        let task = project.getTaskById(taskId);\n        populateModal(task);\n        toggleModal();\n      }\n      // Handle exceptions for complete and delete clicks\n    } else if (e.target.tagName == \"BUTTON\") {\n      // Clicked on + Add New button\n      populateModal({ id: null, title: \"\", note: \"\", dueDate: null, priority: \"low\" });\n      // Open Modal\n      // Default priority\n      // Populate projects options\n      //    Default to the current project\n      toggleModal();\n    }\n  }\n\n  function handleSaveModal(e) {\n    e.preventDefault();\n    console.log(\"save task changes\");\n    let info = getModalData();\n    console.log(info);\n    // required fields before saving\n    if (info.taskTitle == \"\") {\n      alert(\"Title cannot be blank\");\n      return;\n    }\n    if (info.taskId == \"null\") {\n      // save a new task\n      projectList.getProjectById(info.taskProjectId).addTask({\n        title: info.taskTitle,\n        note: info.taskNote,\n        dueDate: info.taskDueDate,\n        priority: info.taskPriority,\n        project: info.taskProjectId,\n      });\n    } else {\n      // save changes for current task\n    }\n    populateMainPanel(projectList.getProjectById(info.taskProjectId)); // re-render tasks\n    toggleModal();\n    clearModal();\n\n    // ! compare to previous item, if same, do nothing, else save.\n    // ! show toast when saved\n  }\n\n  function handleCancelModal(e) {\n    e.preventDefault();\n    toggleModal();\n    clearModal();\n  }\n\n  function toggleModal() {\n    const modal = document.querySelector(\".modal\");\n    const app = document.querySelector(\"#app\");\n    modal.classList.toggle(\"opacity-0\");\n    modal.classList.toggle(\"pointer-events-none\");\n    app.classList.toggle(\"modal-active\");\n  }\n\n  function populateModal(task) {\n    const modalContainer = document.querySelector(\".modal-container\");\n    const titleEl = document.querySelector(\"#task-title\");\n    const dateEl = document.querySelector(\"#task-due-date\");\n    const noteEl = document.querySelector(\"#task-note\");\n    const priorityEl = document.querySelector(\"#task-priority\");\n    const projectEl = document.querySelector(\"#task-project\");\n\n    modalContainer.dataset.taskId = task.id;\n    titleEl.value = task.title;\n    dateEl.value = task.dueDate;\n    noteEl.value = task.note;\n    priorityEl.value = task.priority;\n    projectEl.innerHTML = \"\";\n\n    // dynamically populate project options\n    projectList.getAllProjects().forEach((project) => {\n      projectEl.innerHTML += `\n        <option value=${project._id} ${task.project == project.name ? \"selected\" : \"\"}>${project.name}</option>\n      `;\n    });\n  }\n\n  function getModalData() {\n    const modalContainer = document.querySelector(\".modal-container\");\n    const titleEl = document.querySelector(\"#task-title\");\n    const dateEl = document.querySelector(\"#task-due-date\");\n    const noteEl = document.querySelector(\"#task-note\");\n    const priorityEl = document.querySelector(\"#task-priority\");\n    const projectEl = document.querySelector(\"#task-project\");\n\n    return {\n      taskId: modalContainer.dataset.taskId,\n      taskTitle: titleEl.value,\n      taskDueDate: dateEl.value,\n      taskNote: noteEl.value,\n      taskPriority: priorityEl.value,\n      taskProjectId: projectEl.value,\n    };\n  }\n\n  function clearModal() {\n    const modalContainer = document.querySelector(\".modal-container\");\n    const titleEl = document.querySelector(\"#task-title\");\n    const dateEl = document.querySelector(\"#task-due-date\");\n    const noteEl = document.querySelector(\"#task-note\");\n    const priorityEl = document.querySelector(\"#task-priority\");\n    const projectEl = document.querySelector(\"#task-project\");\n\n    delete modalContainer.dataset.taskId;\n    titleEl.value = \"\";\n    dateEl.value = \"\";\n    noteEl.value = \"\";\n    priorityEl.value = \"\";\n    projectEl.innerHTML = \"\";\n  }\n\n  function applyEventHandlers() {\n    /* Navbar */\n    navbar.addEventListener(\"click\", handleNavbarClicks);\n\n    /* Main Panel */\n    mainPanel.addEventListener(\"click\", handleMainPanelClicks);\n\n    /* Modal */\n    document.querySelector(\"#open-modal\").addEventListener(\"click\", toggleModal);\n    document.querySelector(\"#cancel-modal-btn\").addEventListener(\"click\", handleCancelModal);\n    document.querySelector(\"#save-modal-btn\").addEventListener(\"click\", handleSaveModal);\n    document.querySelector(\".modal-overlay\").addEventListener(\"click\", handleCancelModal);\n  }\n\n  initialize();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);\n\n\n//# sourceURL=webpack://todo-list/./src/components/UI.js?");

/***/ }),

/***/ "./src/components/project.js":
/*!***********************************!*\
  !*** ./src/components/project.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/components/task.js\");\n\n\nconst Project = ({ name, id, tasks }) => {\n  const _id = id || Math.random().toString(36).slice(2, 8);\n  let _tasks = tasks || [];\n\n  function addTask(taskData) {\n    let { title, note, dueDate = null, priority = \"low\", project = _id } = taskData;\n    const task = (0,_task__WEBPACK_IMPORTED_MODULE_0__.default)({ title, note, dueDate, priority, project });\n    _tasks.push(task);\n  }\n\n  function getAllTasks() {\n    return _tasks;\n  }\n\n  function getTaskById(id) {\n    return _tasks.filter((task) => task.id == id)[0];\n  }\n\n  function deleteTaskById(id) {\n    _tasks = _tasks.filter((task) => task.id != id);\n  }\n\n  return {\n    _id,\n    name,\n    addTask,\n    getAllTasks,\n    getTaskById,\n    deleteTaskById,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n\n//# sourceURL=webpack://todo-list/./src/components/project.js?");

/***/ }),

/***/ "./src/components/projectList.js":
/*!***************************************!*\
  !*** ./src/components/projectList.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ProjectList = () => {\n  // inbox = unassocitated projects\n  // today / tomorrow = no matter the project, get items due in timeframe\n  let _list = [];\n\n  function getAllProjects() {\n    return _list;\n  }\n\n  function getProjectById(id) {\n    return _list.filter((proj) => proj._id == id)[0];\n  }\n\n  function addProject(project) {\n    if (typeof project != \"object\") {\n      console.log(\"Must add a Project, not a\", typeof project);\n      return;\n    }\n    _list.push(project);\n  }\n\n  function deleteProjectById(id) {\n    _list = _list.filter((proj) => proj.id !== id);\n  }\n\n  return {\n    getAllProjects,\n    addProject,\n    deleteProjectById,\n    getProjectById,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectList);\n\n\n//# sourceURL=webpack://todo-list/./src/components/projectList.js?");

/***/ }),

/***/ "./src/components/storage.js":
/*!***********************************!*\
  !*** ./src/components/storage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _projectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectList */ \"./src/components/projectList.js\");\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/components/project.js\");\n\n\n\nconst Storage = () => {\n  // Every time an item changes, do you re-save entire application state\n  // or seperate it out into smaller pieces?\n  // Save each project seperately\n  //  - changes to specific project will update local storage\n  //  - to update local storage, must convert to json\n  //  - to retrieve from local storage, must parse json then hyrate an object\n\n  function saveProject(project) {}\n\n  function getProjects() {\n    // returns hydrated projectList from local storage or a new projectList with an inbox project only\n    const projectList = (0,_projectList__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n    let projInbox = (0,_project__WEBPACK_IMPORTED_MODULE_1__.default)({ name: \"Inbox\", id: \"inbox\" });\n    projInbox.addTask({ title: \"Inbox item 1\", note: \"BLah blah\", dueDate: \"2021-06-24\" });\n\n    let proj1 = (0,_project__WEBPACK_IMPORTED_MODULE_1__.default)({ name: \"test proj 1\" });\n    let proj2 = (0,_project__WEBPACK_IMPORTED_MODULE_1__.default)({ name: \"test proj 2\" });\n    proj1.addTask({ title: \"proj1 item 1\", note: \"BLah blah\", dueDate: \"2021-06-25\" });\n    proj2.addTask({ title: \"proj2 item 1\", note: \"BLah blah\", dueDate: \"2021-06-24\" });\n    proj2.addTask({ title: \"proj2 item 2\", dueDate: \"2021-06-25\" });\n\n    projectList.addProject(projInbox);\n    projectList.addProject(proj1);\n    projectList.addProject(proj2);\n\n    return projectList;\n  }\n\n  return {\n    getProjects,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Storage);\n\n\n//# sourceURL=webpack://todo-list/./src/components/storage.js?");

/***/ }),

/***/ "./src/components/task.js":
/*!********************************!*\
  !*** ./src/components/task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Task = ({ title, note, dueDate, priority, id, complete, project }) => {\n  let info = {\n    id: id || Math.random().toString(36).slice(2),\n    complete: complete || false,\n    project: project || \"inbox\",\n    title,\n    note: note || null,\n    dueDate: dueDate || null, // yyyy-MM-dd\n    priority: priority || \"low\",\n  };\n\n  return {\n    ...info,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n\n//# sourceURL=webpack://todo-list/./src/components/task.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/UI */ \"./src/components/UI.js\");\n/* harmony import */ var _components_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/storage */ \"./src/components/storage.js\");\n/* harmony import */ var _styles_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/styles.css */ \"./src/styles/styles.css\");\n\n\n\n\n(0,_components_UI__WEBPACK_IMPORTED_MODULE_0__.default)((0,_components_storage__WEBPACK_IMPORTED_MODULE_1__.default)());\n\n/*\n- Delete functionality\n- complete task\n  - where to store? Completed folder?\n- Add new projects\n- delete entire projects\n- have dropdown default to current project\n*/\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;