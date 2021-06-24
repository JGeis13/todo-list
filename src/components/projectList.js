const ProjectList = () => {
  // inbox = unassocitated projects
  // today / tomorrow = no matter the project, get items due in timeframe
  let _list = [];

  function getAllProjects() {
    return _list;
  }

  function getProjectById(id) {
    return _list.filter((proj) => proj._id == id)[0];
  }

  function addProject(project) {
    if (typeof project != "object") {
      console.log("Must add a Project, not a", typeof project);
      return;
    }
    _list.push(project);
  }

  function deleteProjectById(id) {
    _list = _list.filter((proj) => proj.id !== id);
  }

  return {
    getAllProjects,
    addProject,
    deleteProjectById,
    getProjectById,
  };
};

export default ProjectList;
