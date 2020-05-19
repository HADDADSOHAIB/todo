import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
// import project from './project';
// import todo from './todo';
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
    <span class="p-2 badge badge-pill badge-${ td.getStatus() === 0 ? 'primary' : (td.getStatus() === 1 ? 'danger' : 'success')}">${td.dueDate}</span>
  </div>
  <div>
    ${td.description}
  </div>
  <small class="font-italic">${td.notes}</small>
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
        <textarea class="form-control" id="description" rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="notes">notes</label>
        <textarea class="form-control" id="notes" rows="2"></textarea>
      </div>
      <select class="custom-select">
        <option value="normal">normal</option>
        <option value="high">high</option>
        <option value="low">low</option>
      </select>
      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
  </div>
</div>
`;
let currentUser = window.localStorage.getItem('user');

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
  const project = currentUser.getProjects()[0];
  document.querySelector('#projects').insertAdjacentHTML('afterend', todosForm(project));

  document.querySelector('.new-todo-form').insertAdjacentHTML('beforeend', addTodoForm());


  document.querySelector('.custom-select').addEventListener('change', (e) => {
    if (parseInt(e.target.value, 10) !== 0) {
      document.querySelector('#todos').parentElement.removeChild(document.querySelector('#todos'));
      const project = currentUser.getProjects().find(prt => prt.getId() === e.target.value);
      document.querySelector('#projects').insertAdjacentHTML('afterend', todosForm(project));
    }
  });
}
