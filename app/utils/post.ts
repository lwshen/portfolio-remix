import fs from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

import type { DocAttribute, Post } from '~/types/post';
import { DocAttributeSchema } from '~/types/post';

export const validateAttribute = (fontMatter: Record<string, unknown>): DocAttribute =>
  DocAttributeSchema.parse(fontMatter);

// relative to the server output not the source!
export const postsPath = path.join(__dirname, '..', 'posts');

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

export async function getPost(slug: string): Promise<Post> {
  const filepath = path.join(postsPath, slug + '.md');
  const { attribute: unsafeAttribute, content } = parseFrontMatter(filepath);
  const attribute = validateAttribute(unsafeAttribute);
  return { slug, attribute, markdown: content, html: marked(content) };
}

export async function getPosts(): Promise<Post[]> {
  const dir = await fs.readdir(postsPath);
  const posts = await Promise.all(
    dir.map(async filename => {
      const filePath = path.join(postsPath, filename);
      const { attribute: unsafeAttribute, content } = parseFrontMatter(filePath);
      const attribute = validateAttribute(unsafeAttribute);
      return {
        slug: filename.replace(/\.md$/, ''),
        attribute,
        markdown: content,
        html: marked(content),
      };
    })
  );
  return posts.sort((a, b) => b.attribute.date.getTime() - a.attribute.date.getTime());
}
