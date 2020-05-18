import uid from 'uid';

const todo = (projectId, title, description, dueDate, priority, notes) => {
  let status = 0;
  const id = uid(32);
  const getStatus = () => {
    if (status === 0) {
      return 'To Do';
    }
    if (status === 1) {
      return 'Overdue';
    }
    return 'Done';
  };

  const updateStatus = (stat) => {
    status = stat;
  };

  const getId = () => id;

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    getStatus,
    updateStatus,
    getId,
  };
};

export default todo;