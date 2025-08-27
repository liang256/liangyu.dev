#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCurrentDateTime() {
  return new Date().toISOString().slice(0, 19);
}

async function createPost() {
  try {
    console.log('📝 Creating a new blog post...\n');

    const title = await question('Post title: ');
    if (!title.trim()) {
      console.log('❌ Title is required');
      process.exit(1);
    }

    const excerpt = await question('Post excerpt (optional): ');
    const authorName = await question('Author name (default: Liang): ') || 'Liang';
    
    const slug = slugify(title);
    const date = getCurrentDateTime();
    
    // Create post directory for assets
    const assetsDir = path.join(process.cwd(), 'public', 'assets', 'blog', slug);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
      console.log(`📁 Created assets directory: ${assetsDir}`);
    }

    // Create markdown file
    const postsDir = path.join(process.cwd(), '_posts');
    const postFile = path.join(postsDir, `${slug}.md`);

    if (fs.existsSync(postFile)) {
      console.log(`❌ Post with slug "${slug}" already exists`);
      process.exit(1);
    }

    const frontMatter = `---
title: "${title}"
excerpt: "${excerpt || 'Add your post excerpt here'}"
coverImage: "/assets/blog/${slug}/cover.jpg"
date: "${date}"
author:
  name: ${authorName}
  picture: "/assets/blog/authors/cat_coffee.png"
ogImage:
  url: "/assets/blog/${slug}/cover.jpg"
---

# ${title}

${excerpt ? excerpt + '\n\n' : ''}Write your post content here...
`;

    fs.writeFileSync(postFile, frontMatter);

    // Create a placeholder cover image info
    const coverInfoFile = path.join(assetsDir, 'README.md');
    const coverInfo = `# ${title} Assets

Add your cover image as \`cover.jpg\` in this directory.

Required images:
- cover.jpg (recommended: 1200x630px for social sharing)
`;
    fs.writeFileSync(coverInfoFile, coverInfo);

    console.log('\n✅ Post created successfully!');
    console.log(`📄 Post file: ${postFile}`);
    console.log(`📁 Assets directory: ${assetsDir}`);
    console.log(`🖼️  Don't forget to add a cover.jpg image to the assets directory`);
    console.log(`\n📝 To edit your post: open ${postFile}`);

  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📝 Create New Post Script

Usage: node scripts/create-post.js

This script will prompt you for:
- Post title (required)
- Post excerpt (optional) 
- Author name (default: Liang)

It will create:
- A new markdown file in _posts/
- An assets directory in public/assets/blog/[slug]/
- A README.md in the assets directory with instructions

The post slug is automatically generated from the title.
`);
  process.exit(0);
}

createPost();