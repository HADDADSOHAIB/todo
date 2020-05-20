/* eslint-disable no-nested-ternary */
/* eslint-disable no-nested-ternary, import/no-unresolved */
import moment from 'moment';

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

<div class="d-flex flex-column ${td.priority} p-3 todo "data-id="${td.getId()}">
<div class='mb-1'>
  <button class='delete badge badge-danger p-1 pl-0'>Delete</button>
</div>
  <div class="d-flex justify-content-between">
    <h6>
      ${td.title}
    </h6>
    <div class="d-flex align-items-center">
      <span class="p-1 mr-1 badge badge-${td.status === 0 ? 'primary' : (td.status === 1 ? 'danger' : 'success')}">${td.getStatus()}</span>
      <span class="p-1 badge badge-${td.status === 0 ? 'primary' : (td.status === 1 ? 'danger' : 'success')}">${td.dueDate}</span>
    </div>
  </div>
  <div class='d-flex justify-content-between'>
     <input type='text' class='inputEditable' value="${td.description}" readonly='true'>
     <button class='edit badge badge-primary p-1' id=''>Edit</button>
  </div>
  <small class="font-italic">${td.notes}</small>
  <div class="d-flex justify-content-around align-items-center">
    <span class="p-1 badge badge-${td.priority === 'high' ? 'danger' : (td.priority === 'normal' ? 'info' : 'success')}">Priority: ${td.priority}</span>
    <div class="form-group form-check mb-0">
      <input type="checkbox" ${td.status === 2 ? 'checked' : ''} class="form-check-input" data-id="${td.getId()}" id="complet">
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
        <input type="date"  min='${moment().format('YYYY-MM-DD')}' class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary" id='submit-todo'>Submit</button>
    </form>
    </div>
  </div>
</div>
`;

export {
  userForm,
  projectFrom,
  todoForm,
  todosForm,
  addNewProject,
  addTodoForm,
};