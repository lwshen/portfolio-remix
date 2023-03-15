import fs from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';

import type { DocAttribute } from '~/types/post';
import { DocAttributeSchema } from '~/types/post';

export const validateAttribute = (frontmatter: Record<string, unknown>): DocAttribute =>
  DocAttributeSchema.parse(frontmatter);

// relative to the server output not the source!
export const postsPath = path.join(__dirname, '..', 'posts');

const parseFrontMatter = (
  filePath: string
): {
  attributes: Record<string, unknown>;
  content: string;
} => {
  const { data, content } = matter.read(filePath);
  return {
    attributes: data,
    content: content.trim(),
  };
};

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + '.md');
  const { attributes: unsafeAttributes, content } = parseFrontMatter(filepath);
  const attributes = validateAttribute(unsafeAttributes);
  return { slug, title: attributes.title, html: marked(content) };
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const filePath = path.join(postsPath, filename);
      const { attributes: unsafeAttributes } = parseFrontMatter(filePath);
      const attributes = validateAttribute(unsafeAttributes);
      return {
        slug: filename.replace(/\.md$/, ''),
        title: attributes.title,
      };
    })
  );
}
