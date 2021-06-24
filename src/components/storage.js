import ProjectList from "./projectList";
import Project from "./project";

const Storage = () => {
  // Every time an item changes, do you re-save entire application state
  // or seperate it out into smaller pieces?
  // Save each project seperately
  //  - changes to specific project will update local storage
  //  - to update local storage, must convert to json
  //  - to retrieve from local storage, must parse json then hyrate an object

  function saveProject(project) {}

  function getProjects() {
    // returns hydrated projectList from local storage or a new projectList with an inbox project only
    const projectList = ProjectList();

    let projInbox = Project({ name: "Inbox", id: "inbox" });
    projInbox.addTask({ title: "Inbox item 1", note: "BLah blah", dueDate: "2021-06-24" });

    let proj1 = Project({ name: "test proj 1" });
    let proj2 = Project({ name: "test proj 2" });
    proj1.addTask({ title: "proj1 item 1", note: "BLah blah", dueDate: "2021-06-25" });
    proj2.addTask({ title: "proj2 item 1", note: "BLah blah", dueDate: "2021-06-24" });
    proj2.addTask({ title: "proj2 item 2", dueDate: "2021-06-25" });

    projectList.addProject(projInbox);
    projectList.addProject(proj1);
    projectList.addProject(proj2);

    return projectList;
  }

  return {
    getProjects,
  };
};

export default Storage;
