/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import projectf from './project';
import todo from './todo';
import user from './user';
import { save, load } from './storageLogic';

const userForm = () => `
<div class="d-flex justify-content-center m-4">
  <div class="card" style="width: 25rem;">
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="name">User Name:</label>
        <input type="text" class="form-control" placeholder="enter user name ..." id="name" required>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block" id="new-user">Submit</button>
      </div>
    </form>
    </div>
  </div>
</div>
`;

const projectFrom = (projects) => `
<div class="d-flex justify-content-center m-4" id="projects">
  <div class="card" style="width: 25rem;">
    <div class="card-body">
      <select class="custom-select">
        <option value="0" selected>Choose a project:</option>
        ${projects.map(project => `<option value="${project.getId()}">${project.title}</option>`).join('')}
      </select>
    </div>
  </div>
</div>
`;

const todoForm = (td) => `
<hr>
<div class="d-flex flex-column ${td.priority} p-3">
  <div class="d-flex justify-content-between">
    <h6>
      ${td.title}
    </h6>
    <div class="d-flex align-items-center">
      <span class="p-1 mr-1 badge badge-${td.getStatusInt() === 0 ? 'primary' : (td.getStatusInt() === 1 ? 'danger' : 'success')}">${td.getStatus()}</span>
      <span class="p-1 badge badge-${td.getStatusInt() === 0 ? 'primary' : (td.getStatusInt() === 1 ? 'danger' : 'success')}">${td.dueDate}</span>
    </div>
  </div>
  <div>
    ${td.description}
  </div>
  <small class="font-italic">${td.notes}</small>
  <div class="d-flex justify-content-around align-items-center">
    <span class="p-1 badge badge-${td.priority === 'high' ? 'danger' : (td.priority === 'normal' ? 'info' : 'success')}">Priority: ${td.priority}</span>
    <div class="form-group form-check mb-0">
      <input type="checkbox" ${td.getStatusInt() === 2 ? 'checked' : ''} class="form-check-input" data-id="${td.getId()}" id="complet">
      <label class="form-check-label" for="complet">completed</label>
    </div>
  </div>
</div>
`;

const todosForm = (project) => `
<div class="d-flex justify-content-center m-4" id="todos">
  <div class="card" style="width: 25rem;">
    <div class="card-body">
    <div>
      ${project.description}
    </div>
    ${project.getTodos().map(td => todoForm(td)).join('')}
    </div>
  </div>
</div>
`;

const addNewProject = () => `
<div class="d-flex justify-content-center m-4" id="new-project">
  <div class="card" style="width: 25rem;">
    <div class="card-header d-flex justify-content-center">
      Add new project
    </div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="title-p">Title</label>
        <input type="text" class="form-control" id="title-p">
      </div>
      <div class="form-group">
        <label for="description-p">description</label>
        <input type="text" class="form-control" id="description-p">
      </div>
      <button type="submit" class="btn btn-primary" id='submit-project'>Submit</button>
      </form>
    </div>
  </div>
</div>
`;

const addTodoForm = () => `
<div class="d-flex justify-content-center m-4" id="add-todo">
  <div class="card" style="width: 25rem;">
    <div class="card-header d-flex justify-content-center">
      Add new todo
    </div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="description">description</label>
        <input type='text' class="form-control" id="description">
      </div>
      <div class="form-group">
        <label for="notes">notes</label>
        <input type='text' class="form-control" id="notes">
      </div>
      <select id="custom-select">
        <option value="normal">normal</option>
        <option value="high">high</option>
        <option value="low">low</option>
      </select>
      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary" id='submit-todo'>Submit</button>
    </form>
    </div>
  </div>
</div>
`;

let currentUser = window.localStorage.getItem('user');

const addCompletEvent = (currentProject, user) => {
  Array.from(document.querySelectorAll('#complet')).forEach((check) => {
    check.addEventListener('click', function () {
      const selectedTodo = currentProject.getTodos().find(td => td.getId() === this.dataset.id);
      console.log(selectedTodo.status);
      if (selectedTodo && this.checked) {
        selectedTodo.status = 2;
      } else {
        selectedTodo.status = 0;
      }
      console.log(selectedTodo.status);
      console.log(user);
      save(user);
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
    window.location.assign('/dist/');
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
    const tempTitle = document.querySelector('#title').value;
    const tempDescription = document.querySelector('#description').value;
    const tempNotes = document.querySelector('#notes').value;
    const tempPriority = document.querySelector('#custom-select').value;
    const tempDate = document.querySelector('#dueDate').value;
    const tempTodo = todo(tempTitle, tempDescription, tempDate, tempPriority, tempNotes);
    selectedProject.addTodo(tempTodo);
    document.querySelector('#todos .card-body').insertAdjacentHTML('beforeend', todoForm(tempTodo));
    save(currentUser);
    addCompletEvent(selectedProject, currentUser);
  });
  document.querySelector('#submit-project').addEventListener('click', (e) => {
    e.preventDefault();
    const tempTitle = document.querySelector('#title-p').value;
    const tempDescription = document.querySelector('#description-p').value;
    const tempProject = projectf(tempTitle, tempDescription);
    currentUser.addProject(tempProject);
    document.querySelector('.custom-select').insertAdjacentHTML('beforeend', `<option value="${tempProject.getId()}">${tempProject.title}</option>`);
    document.querySelector('#title-p').value = '';
    document.querySelector('#description-p').value = '';
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
