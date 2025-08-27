# liangyu.dev

A personal website and blog built with Next.js, TypeScript, and Tailwind CSS.

This statically generated site showcases blog posts, projects, and personal content using Markdown files as the data source.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd liangyu.dev
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

### Other Commands

- `npm run lint` - Run ESLint to check code quality
- `npm run new-post` - Create a new blog post with interactive prompts

## Features

- ✨ Static site generation with Next.js
- 📝 Markdown blog posts with front matter support
- 🎨 Tailwind CSS for styling
- 🔍 Syntax highlighting with Prism.js
- 📱 Responsive design
- ⚡ Optimized performance

## Content Management

### Creating New Blog Posts

Use the interactive post generator:

```bash
npm run new-post
```

This will prompt you for:
- Post title (required)
- Post excerpt (optional)
- Author name (defaults to "Liang")

The script automatically:
- Generates a URL-friendly slug from the title
- Creates the markdown file in `/_posts/`
- Sets up the assets directory in `/public/assets/blog/[slug]/`
- Includes proper front matter with all required fields
- Adds a placeholder README for cover images

### Manual Post Creation

- Blog posts are stored in `/_posts` as Markdown files
- Front matter is used for post metadata (title, date, author, etc.)
- Cover images should be placed in `/public/assets/blog/[slug]/cover.jpg`
