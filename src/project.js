
const project = (id, title, description) => {
  let todoArr = [];

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

  const setTodos = (todos) => {
    todoArr = todos;
  };

  const getId = () => id;

  return {
    title,
    description,
    todoArr,
    id,
    addTodo,
    removeTodo,
    checkOverdues,
    setTodos,
  };
};

export default project;