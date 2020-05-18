const save = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
  window.localStorage.setItem('projects', JSON.stringify(user.getPrimiteProjects()));
};

export default save;