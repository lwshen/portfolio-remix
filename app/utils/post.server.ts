import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import type { DocAttribute, Post } from '~/types/post';
import { DocAttributeSchema } from '~/types/post';

import { renderMarkdown } from './markdown';

export const validateAttribute = (fontMatter: Record<string, unknown>): DocAttribute =>
  DocAttributeSchema.parse(fontMatter);

// relative to the server output not the source!
export const postsPath = path.join(process.cwd(), 'posts');

const parseFrontMatter = (
  filePath: string
): {
  attribute: Record<string, unknown>;
  content: string;
} => {
  const { data, content } = matter.read(filePath);
  return {
    attribute: data,
    content: content.trim(),
  };
};

export async function createPost(post: Post) {
  const md = matter.stringify(post.markdown, post.attribute);
  await fs.writeFile(path.join(postsPath, post.slug + '.md'), md);
  return getPost(post.slug);
}

export async function getPost(slug: string): Promise<Post> {
  const filepath = path.join(postsPath, slug + '.md');
  const { attribute: unsafeAttribute, content } = parseFrontMatter(filepath);
  const attribute = validateAttribute(unsafeAttribute);
  return { slug, attribute, markdown: content, html: await renderMarkdown(content) };
}

export async function getPosts(): Promise<Post[]> {
  const dir = await fs.readdir(postsPath);
  const posts = await Promise.all(
    dir.map(async filename => {
      const slug = filename.replace(/\.md$/, '');
      return getPost(slug);
    })
  );
  return posts.sort((a, b) => b.attribute.date.getTime() - a.attribute.date.getTime());
}
