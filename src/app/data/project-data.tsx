import { Project } from '@/interfaces/project';

export const projectsData: Project[] = [
    {
      id: '1',
      title: 'Tetris',
      description: 'A simple Tetris game implemented in Python.',
      date: '2023-01-15',
      tags: ['Python'],
      views: 2201,
      type: 'hero',
      slug: 'tetris',
      link: "https://github.com/liang256/tetris",
      published: true
    },
    {
      id: '2',
      title: 'Blind Gomoku',
      description: 'A Gomoku game that can be played in color-blind mode. Used socketio to implement real-time game play. Express server to handle game logic.',
      date: '2023-02-20',
      tags: ["React", "Node.js", "Express.js", "socket.io"],
      views: 751,
      type: 'secondary',
      slug: 'blind-gomoku',
      link: "https://github.com/liang256/blind-gomoku-server",
      published: true
    },
    {
      id: '3',
      title: 'Go Tiny Raytracer',
      description: 'A tiny raytracer implemented in Go.',
      date: '2022-12-05',
      tags: ['Go'],
      views: 453,
      type: 'secondary',
      slug: 'go-tiny-raytracer',
      published: true,
      link: "https://github.com/liang256/go-tinyraytracer"
    },
    {
      id: '4',
      title: 'Solana By Example',
      description: 'A collection of examples to help developers learn Solana.',
      date: '2023-03-11',
      tags: ["Rust"],
      views: 1206,
      type: 'normal',
      slug: 'solana-by-example',
      published: true,
      link: "https://liang256.github.io/solana-by-example/"
    },
    {
      id: '5',
      title: 'Crack ATS',
      description: 'A tool that help job seekers parse job descriptions and generate resumes. Generate ATS-friendly resumes. Customize resume templates. Export resumes in various formats (PDF, DOCX, etc.)', 
      date: '2023-01-22',
      tags: [
        "Python",
        "openai",
        "fpdf"
      ],
      views: 652,
      type: 'normal',
      slug: 'crack-ats',
      published: true,
      link: "https://github.com/liang256/crack-ats"
    },
    {
      id: '6',
      title: 'Enso Executer',
      description: 'A tool that helps artists to batch process Houdini files. A Python framework that streamlines Houdini script execution, leveraging DDD',
      date: '2023-02-14',
      tags: [
        "Pyhon",
        "Flask",
        "Docker"
      ],
      views: 1012,
      type: 'normal',
      slug: 'enso-executer',
      published: true,
      link: "https://github.com/liang256/enso-executer"
    },
    {
      id: '7',
      title: "into pool",
      description: 'A project that create liminal space style images using AI. Compared Dall-E-2, Dall-E-3, and other AI models, and developed a better pipeline to generate images.',
      date: '2022-11-30',
      tags: ['Pyhon', 'openai', 'AI', 'Docker'],
      views: 1150,
      type: 'normal',
      slug: 'into-pool',
      published: true,
      link: "https://github.com/liang256/intopool"
    },
    {
      id: '8',
      title: 'Cigarette After Fight',
      description: 'A short film that tells a after story after a big fight.',
      date: '2023-03-05',
      tags: ['animation'],
      views: 139,
      type: 'normal',
      slug: 'cigarette-after-fight',
      published: true,
      link: "https://vimeo.com/412302470"
    },
    {
      id: '9',
      title: 'blend-mesh-deformer',
      description: 'Implement a blendshape node of Maya in C++',
      date: '2023-03-05',
      tags: ['C++', 'Maya'],
      views: 33,
      type: 'normal',
      slug: 'bike-sharing',
      published: true,
      link: "https://github.com/liang256/blend-mesh-deformer"
    },
    {
      id: '10',
      title: 'Emoji Picker',
      description: 'This project is an Emoji Website built with Next.js and Tailwind CSS. Users can explore various emojis by category and copy them to the clipboard with a single click.',
      date: '2024-05-18',
      tags: ['Next.js', 'Tailwind CSS', 'React'],
      views: 83,
      type: 'normal',
      slug: 'emoji-picker',
      published: true,
      link: "https://emoji.liangyu.dev"
    },
    {
      id: '11',
      title: 'Instagram Viewer',
      description: 'This project is an Instagram Viewer built with Next.js and Tailwind CSS. Users can view Instagram posts and stories without logging in.',
      date: '2024-05-25',
      tags: ['Next.js', 'Tailwind CSS', 'React'],
      views: 145,
      type: 'normal',
      slug: 'instagram-viewer',
      published: true,
      link: "https://instaview.liangyu.dev"
    },
    {
      id: '12',
      title: 'Prompt Swim',
      description: 'A web app that serves as a prompt gallery for artists. Artists can submit prompts and view other artists\' work.\n- Built using Next.js, TypeScript, MongoDB, OpenAI, DALL·E, and AWS Lambda. Deployed on Vercel.\n- Integrated with Google OAuth for authentication and Stripe for payments.',
      date: '2024-07-01',
      tags: ['Next.js', 'Tailwind CSS', 'React', 'TypeScript', 'MongoDB', 'OpenAI', 'DALL·E', 'AWS Lambda', 'Vercel', 'Google OAuth', 'Stripe'],
      views: 4192,
      type: 'normal',
      slug: 'prompt-swim',
      published: true,
      link: "https://promptswim.com"
    },
  ];
  