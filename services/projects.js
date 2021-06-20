import { getList } from 'lib/markdownparser';

export const getAllProjects = () => {
  const projects = getList('_projects');

  return projects.sort((a, b) => a.createdAt - b.createdAt).reverse();
};
