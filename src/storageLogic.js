/* eslint-disable no-nested-ternary, import/no-unresolved */
import user from './user';
import project from './project';
import todo from './todo';

const save = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
  window.localStorage.setItem('projects', JSON.stringify(user.getPrimiteProjects()));
};

const load = () => {
  const oldUser = user(JSON.parse(window.localStorage.getItem('user')).name);
  const projects = JSON.parse(window.localStorage.getItem('projects'));
  let temP;
  projects.forEach((p, i) => {
    if (i !== 0) {
      temP = project(p.title, p.description);
      p.todos.forEach(tod => temP.addTodo(todo(
        tod.title,
        tod.description,
        tod.dueDate,
        tod.priority,
        tod.notes,
        tod.status,
      )));
      oldUser.addProject(temP);
    } else {
      p.todos.forEach(tod => oldUser.getProjects()[0].addTodo(todo(
        tod.title,
        tod.description,
        tod.dueDate,
        tod.priority,
        tod.notes,
        tod.status,
      )));
    }
  });
  oldUser.getProjects().forEach(project => project.checkOverdues());
  return oldUser;
};

export { save, load };
