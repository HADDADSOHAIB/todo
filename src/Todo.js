const Todo = (title, description, dueDate, priority, notes) => {
  let status = 0;
  const getStatus = () => {
    if (status === 0) {
      return 'To Do';
    }
    if (status === 1) {
      return 'Overdue';
    }
    return 'Done';
  };

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    getStatus,
  };
};

export default Todo;