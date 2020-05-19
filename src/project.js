/* eslint-disable no-nested-ternary, import/no-unresolved */
import uid from 'uid';

const project = (title, description) => {
  let todoArr = [];
  const id = uid(32);

  const addTodo = (todo) => {
    todoArr.push(todo);
  };

  const removeTodo = (id) => {
    const i = todoArr.findIndex(element => element.getId() === id);
    if (i !== -1) {
      todoArr.splice(i, 1);
    }
  };

  const checkOverdues = () => {
    todoArr.forEach(e => {
      if (e.getStatus() === 'To Do' && Date.parse(e.dueDate) < Date.now()) {
        e.updateStatus(1);
      }
    });
  };

  const getTodos = () => todoArr;

  const setTodos = (todos) => {
    todoArr = todos;
  };

  const getId = () => id;

  return {
    title,
    description,
    addTodo,
    removeTodo,
    checkOverdues,
    setTodos,
    getId,
    getTodos,
  };
};

export default project;
