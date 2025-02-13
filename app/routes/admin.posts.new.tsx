import { Button, Input, Textarea } from '@chakra-ui/react';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';

import type { Post } from '~/types/post';
import { createPost } from '~/utils/post.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = (formData.get('title') || '').toString();
  const slug = (formData.get('slug') || '').toString();
  const markdown = (formData.get('markdown') || '').toString();

  await createPost({
    attribute: { title: title, date: new Date() },
    slug,
    html: '',
    markdown,
  } as Post);

  return redirect('/posts');
};

export default function NewPost() {
  return (
    <Form className="space-y-2" method="post">
      <p>
        <label htmlFor="title">
          Post Title: <Input type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="slug">
          Post Slug: <Input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <Textarea id="markdown" rows={15} name="markdown" colorScheme="twitter" />
      </p>
      <p>
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </p>
    </Form>
  );
}
