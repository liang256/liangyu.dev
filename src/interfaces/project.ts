export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  views: number;
  type: 'hero' | 'secondary' | 'normal'; // Type of project
  published: boolean;
  slug: string;
  link: string;
}
  