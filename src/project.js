import uid from 'uid';

const project = (title, description) => {
  const todoArr = [];
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
      if (e.getStatus() === 0 && e.dueDate < Date.now()) {
        e.updateStatus(1);
      }
    });
  };

  const getTodos = () => todoArr;

  const getId = () => id;

  return {
    title,
    description,
    addTodo,
    removeTodo,
    checkOverdues,
    getTodos,
  };
};

export default project;