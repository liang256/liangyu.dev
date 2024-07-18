import React from 'react';
import { redirect } from 'next/navigation'
// import { revalidatePath } from 'next/cache'

const ProjectsPage: React.FC = () => {
  return redirect("/posts")
};

export default ProjectsPage;

