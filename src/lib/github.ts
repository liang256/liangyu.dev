// GitHub API service to fetch real repository data
import { Project } from '@/interfaces/project';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

interface GitHubLanguages {
  [key: string]: number;
}

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'liang256';

// Featured projects that we want to highlight (based on your current data)
const FEATURED_PROJECTS = [
  'prompt-swim',
  'tetris', 
  'go-tinyraytracer',
  'blind-gomoku-server',
  'solana-by-example',
  'crack-ats',
  'enso-executer',
  'intopool',
  'blend-mesh-deformer',
  'emoji-picker',
  'instagram-viewer'
];

// Project descriptions and additional info that GitHub API doesn't provide
const PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  'prompt-swim': {
    title: 'Prompt Swim',
    description: 'A web app that serves as a prompt gallery for artists. Artists can submit prompts and view other artists\' work.\n- Built using Next.js, TypeScript, MongoDB, OpenAI, DALL·E, and AWS Lambda. Deployed on Vercel.\n- Integrated with Google OAuth for authentication and Stripe for payments.',
    views: 4192,
    type: 'hero',
    link: 'https://promptswim.com'
  },
  'tetris': {
    title: 'Tetris',
    description: 'A simple Tetris game implemented in Python.',
    views: 2201,
    type: 'secondary'
  },
  'go-tinyraytracer': {
    title: 'Go Tiny Raytracer',
    description: 'A tiny raytracer implemented in Go.',
    views: 453,
    type: 'secondary'
  },
  'blind-gomoku-server': {
    title: 'Blind Gomoku',
    description: 'A Gomoku game that can be played in color-blind mode. Used socketio to implement real-time game play. Express server to handle game logic.',
    views: 751
  },
  'solana-by-example': {
    title: 'Solana By Example',
    description: 'A collection of examples to help developers learn Solana.',
    views: 1206,
    link: 'https://liang256.github.io/solana-by-example/'
  },
  'crack-ats': {
    title: 'Crack ATS',
    description: 'A tool that help job seekers parse job descriptions and generate resumes. Generate ATS-friendly resumes. Customize resume templates. Export resumes in various formats (PDF, DOCX, etc.)',
    views: 652
  },
  'enso-executer': {
    title: 'Enso Executer',
    description: 'A tool that helps artists to batch process Houdini files. A Python framework that streamlines Houdini script execution, leveraging DDD',
    views: 1012
  },
  'intopool': {
    title: 'Into Pool',
    description: 'A project that create liminal space style images using AI. Compared Dall-E-2, Dall-E-3, and other AI models, and developed a better pipeline to generate images.',
    views: 1150
  },
  'blend-mesh-deformer': {
    title: 'Blend Mesh Deformer',
    description: 'Implement a blendshape node of Maya in C++',
    views: 33
  }
};

async function fetchWithCache(url: string, cacheTime = 300000): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'liangyu.dev'
      },
      next: { revalidate: cacheTime / 1000 } // Next.js cache revalidation
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch from GitHub:', error);
    throw error;
  }
}

async function getRepositoryLanguages(repoName: string): Promise<string[]> {
  try {
    const languages: GitHubLanguages = await fetchWithCache(
      `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/languages`
    );
    
    // Return top 3 languages by bytes
    return Object.entries(languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);
  } catch {
    return [];
  }
}

function mapGitHubRepoToProject(repo: GitHubRepo, languages: string[] = []): Project {
  const override = PROJECT_OVERRIDES[repo.name] || {};
  
  // Use homepage if available, otherwise GitHub URL
  const projectUrl = override.link || repo.homepage || repo.html_url;
  
  return {
    id: repo.id.toString(),
    title: override.title || formatTitle(repo.name),
    description: override.description || repo.description || 'No description available',
    date: repo.created_at.split('T')[0], // Convert to YYYY-MM-DD
    tags: languages.length > 0 ? languages : (repo.language ? [repo.language] : []),
    views: override.views || Math.floor(repo.stargazers_count * 100 + Math.random() * 500), // Estimate views
    type: override.type || 'normal',
    published: !repo.private && !repo.archived,
    slug: repo.name,
    link: projectUrl
  };
}

function formatTitle(repoName: string): string {
  return repoName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    // Fetch all repositories
    const repos: GitHubRepo[] = await fetchWithCache(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`
    );

    // Filter for featured projects and non-forked repos
    const relevantRepos = repos.filter(repo => 
      !repo.fork && 
      !repo.private && 
      !repo.archived &&
      (FEATURED_PROJECTS.includes(repo.name) || repo.stargazers_count > 0 || repo.description)
    );

    // Fetch languages for each repo (with some rate limiting consideration)
    const projectsPromises = relevantRepos.map(async (repo) => {
      try {
        const languages = await getRepositoryLanguages(repo.name);
        return mapGitHubRepoToProject(repo, languages);
      } catch {
        // Fallback without languages if API call fails
        return mapGitHubRepoToProject(repo);
      }
    });

    const projects = await Promise.all(projectsPromises);

    // Sort by priority: featured projects first, then by stars/update date
    return projects.sort((a, b) => {
      // Prioritize featured projects
      const aFeatured = FEATURED_PROJECTS.includes(a.slug);
      const bFeatured = FEATURED_PROJECTS.includes(b.slug);
      
      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;
      
      // Then by type priority
      const typeOrder = { hero: 0, secondary: 1, normal: 2 };
      const typeDiff = typeOrder[a.type] - typeOrder[b.type];
      if (typeDiff !== 0) return typeDiff;
      
      // Finally by views/stars
      return b.views - a.views;
    });

  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error);
    
    // Fallback to some basic projects if API fails
    return [
      {
        id: '1',
        title: 'GitHub Profile',
        description: 'Visit my GitHub profile to see all my projects',
        date: new Date().toISOString().split('T')[0],
        tags: ['GitHub'],
        views: 0,
        type: 'normal',
        published: true,
        slug: 'github-profile',
        link: `https://github.com/${USERNAME}`
      }
    ];
  }
}