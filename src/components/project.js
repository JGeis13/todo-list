import Task from "./task";

const Project = ({ name, id, tasks }) => {
  const _id = id || Math.random().toString(36).slice(2, 8);
  const _tasks = tasks || [];

  function addTask(taskData) {
    let { title, note, dueDate = null, priority = "low", project = _id } = taskData;
    const task = Task({ title, note, dueDate, priority, project });
    _tasks.push(task);
  }

  function getAllTasks() {
    return _tasks;
  }

  function getTaskById(id) {
    return _tasks.filter((task) => task.id == id)[0];
  }

  function deleteTaskById(id) {
    _tasks = _tasks.filter((task) => task.id != id);
  }

  return {
    _id,
    name,
    addTask,
    getAllTasks,
    getTaskById,
    deleteTaskById,
  };
};

export default Project;
