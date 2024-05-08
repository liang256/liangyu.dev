import React from 'react';
import { ProjectCard } from '@/app/_components/project-card';
import { Project } from '@/interfaces/project';
import Container from './_components/container';
import { NavBar } from './_components/nav-bar';
import Projects from './projects/page';

const ProjectsPage: React.FC = () => {
  return (
    <Projects/>
  );
};

export default ProjectsPage;

