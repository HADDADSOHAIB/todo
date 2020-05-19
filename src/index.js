import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import project from './project';
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
<div class="d-flex justify-content-center m-4">
  <div class="card" style="width: 25rem;">
    <div class="card-body">
      <select class="custom-select">
        <option selected>Choose a project:</option>
        ${projects.map(project => `<option value="${project.getId()}">${project.title}</option>`).join('')}
      </select>
    </div>
  </div>
</div>
`;

const todosFrom = (project) => `
<div class="d-flex justify-content-center m-4">
  <div class="card" style="width: 25rem;">
    <div class="card-body">
      ${project..map(project => `<option value="${project.getId()}">${project.title}</option>`).join('')}
    </div>
  </div>
</div>
`;

const todo = (td) => `
<hr>
<div class="d-flex flex-column ${td.priority}">
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

  document.querySelector('.custom-select').addEventListener('change', function(e) {
    console.log(e.target.value);
  });
}
