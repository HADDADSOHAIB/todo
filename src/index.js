/* eslint-disable func-names */
/* eslint-disable no-nested-ternary, import/no-unresolved */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import projectf from './project';
import todo from './todo';
import user from './user';
import { save, load } from './storageLogic';
import {
  userForm,
  projectFrom,
  todoForm,
  todosForm,
  addNewProject,
  addTodoForm,
} from './domConstants';

let currentUser = window.localStorage.getItem('user');

const findTodo = (id, currentProject) => {
  const returnMe = currentProject.getTodos().find(td => td.getId() === id);
  return returnMe;
};
const addCompletEvent = (currentProject, user) => {
  const temptodos = Array.from(document.querySelectorAll('.todo'));
  temptodos.forEach((check) => {
    const tempid = check.dataset.id;
    check.querySelector('#complet').addEventListener('click', function () {
      const selectedTodo = findTodo(tempid, currentProject);
      if (selectedTodo && this.checked) {
        selectedTodo.status = 2;
      } else {
        selectedTodo.status = 0;
      }
      save(user);
    });
    check.querySelector('.delete').addEventListener('click', () => {
      const selectedTodo = findTodo(tempid, currentProject);
      currentProject.deleteTodo(selectedTodo);
      save(user);
      window.location.href = '/';
    });
    check.querySelector('.edit').addEventListener('click', () => {
      const elem = check.querySelectorAll('.inputEditable');
      const values = Array.from(elem);
      elem.forEach((e) => {
        e.readOnly = false;
        e.classList.remove('inputEditable');
        e.addEventListener('keypress', (ee) => {
          if (ee.code === 'Enter') {
            const selectedTodo = findTodo(tempid, currentProject);
            selectedTodo.title = values[0].value;
            selectedTodo.notes = values[2].value;
            selectedTodo.description = values[1].value;
            e.classList.add('inputEditable');
            save(user);
          }
        });
      });
    });
  });
};

if (!currentUser) {
  document.querySelector('.content').insertAdjacentHTML('afterbegin', userForm());
  // eslint-disable-next-line prefer-arrow-callback
  document.querySelector('#new-user').addEventListener('click', function (e) {
    e.preventDefault();
    const newName = document.querySelector('#name').value;

    if (newName.trim() !== '') {
      currentUser = user(newName);
      save(currentUser);
    }
    window.location.assign('/');
  });
} else {
  currentUser = load();
  document.querySelector('.content').insertAdjacentHTML('afterbegin', projectFrom(currentUser.getProjects()));
  let selectedProject = currentUser.getProjects()[0];
  document.querySelector('#projects').insertAdjacentHTML('afterend', todosForm(selectedProject));
  addCompletEvent(selectedProject, currentUser);
  document.querySelector('.new-todo-form').insertAdjacentHTML('beforeend', addNewProject());
  document.querySelector('.new-todo-form').insertAdjacentHTML('beforeend', addTodoForm());
  document.querySelector('#submit-todo').addEventListener('click', (e) => {
    e.preventDefault();
    const tempTitle = document.querySelector('#title');
    const tempDescription = document.querySelector('#description');
    const tempNotes = document.querySelector('#notes');
    const tempPriority = document.querySelector('#custom-select');
    const tempDate = document.querySelector('#dueDate');
    const tempTodo = todo(
      tempTitle.value,
      tempDescription.value,
      tempDate.value,
      tempPriority.value,
      tempNotes.value,
    );
    selectedProject.addTodo(tempTodo);
    document.querySelector('#todos .card-body').insertAdjacentHTML('beforeend', todoForm(tempTodo));
    save(currentUser);
    tempTitle.value = '';
    tempDescription.value = '';
    tempNotes.value = '';
    tempPriority.value = '';
    addCompletEvent(selectedProject, currentUser);
  });
  document.querySelector('#submit-project').addEventListener('click', (e) => {
    e.preventDefault();
    const tempTitle = document.querySelector('#title-p');
    const tempDescription = document.querySelector('#description-p');
    const tempProject = projectf(tempTitle.value, tempDescription.value);
    currentUser.addProject(tempProject);
    document.querySelector('.custom-select').insertAdjacentHTML('beforeend', `<option value="${tempProject.getId()}">${tempProject.title}</option>`);
    tempTitle.value = '';
    tempDescription.value = '';
    save(currentUser);
  });

  document.querySelector('.custom-select').addEventListener('change', (e) => {
    if (parseInt(e.target.value, 10) !== 0) {
      document.querySelector('#todos').parentElement.removeChild(document.querySelector('#todos'));
      const project = currentUser.getProjects().find(prt => prt.getId() === e.target.value);
      document.querySelector('#projects').insertAdjacentHTML('afterend', todosForm(project));
      selectedProject = project;
      addCompletEvent(selectedProject, currentUser);
    }
  });
}
