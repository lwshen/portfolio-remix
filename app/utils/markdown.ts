// @ts-ignore: 1479
import rehypeHighlight from 'rehype-highlight';
// @ts-ignore: 1479
import rehypeKatex from 'rehype-katex';
// @ts-ignore: 1479
import rehypeStringify from 'rehype-stringify';
// @ts-ignore: 1479
import remarkEmoji from 'remark-emoji';
// @ts-ignore: 1479
import remarkGfm from 'remark-gfm';
// @ts-ignore: 1479
import remarkParse from 'remark-parse';
// @ts-ignore: 1479
import remarkRehype from 'remark-rehype';
// @ts-ignore: 1479
import { unified } from 'unified';

export async function renderMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkEmoji)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);
  return result.value.toString();
}
