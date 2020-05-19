import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import project from './project';
import todo from './todo';
import user from './user';
import {save, load} from './storageLogic';

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

const currentUser = window.localStorage.getItem('user');

if (!currentUser) {
  document.querySelector('.content').insertAdjacentHTML('afterbegin', userForm());
  // eslint-disable-next-line prefer-arrow-callback
  document.querySelector('#new-user').addEventListener('click', function (e) {
    e.preventDefault();
    const newName = document.querySelector('#name').value;

    if (newName.trim() !== '') {
      const newUser = user(newName);
      save(newUser);
    }
  });
} else {
  const user = load();
  console.log(user);
  console.log(user.getProjects());
  console.log(user.getProjects()[0].getTodos());
}