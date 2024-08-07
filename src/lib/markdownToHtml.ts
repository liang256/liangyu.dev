import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus' // Add this import for Prism.js
import rehypePicture from 'rehype-picture'

export default async function markdownToHtml(content: string) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(rehypePicture, {
      jpg: {webp: 'image/webp'},
      png: {svg: 'image/svg+xml'}
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrism) // Add rehypePrism for syntax highlighting
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content);

  return String(processedContent);
}
