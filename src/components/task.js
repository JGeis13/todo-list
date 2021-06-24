const Task = ({ title, note, dueDate, priority, id, complete, project }) => {
  let info = {
    id: id || Math.random().toString(36).slice(2),
    complete: complete || false,
    project: project || "inbox",
    title,
    note: note || null,
    dueDate: dueDate || null, // yyyy-MM-dd
    priority: priority || "low",
  };

  return {
    ...info,
  };
};

export default Task;
