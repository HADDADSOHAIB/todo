import project from './project';

const user = (name) => {
  const projects = [project('default project', 'description :)')];

  const addProject = (title, description) => projects.push(project(title, description));

  const removeProject = (id) => {
    const i = projects.findIndex(element => element.getId() === id);
    if (i !== -1) {
      projects.splice(i, 1);
    }
  };

  const getProject = (id) => {
    const i = projects.findIndex(element => element.getId() === id);
    if (i !== -1) {
      return projects[i];
    }
    return -1;
  };

  const getProjects = () => projects;

  return {
    name,
    addProject,
    removeProject,
    getProject,
    getProjects,
  };
};

export default user;