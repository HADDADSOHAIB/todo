/* eslint-disable no-nested-ternary, import/no-unresolved */
import uid from 'uid';

const todo = (title, description, dueDate, priority, notes, status = 0) => {
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

  const getId = () => id;

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    status,
    getStatus,
    getId,
  };
};

export default todo;