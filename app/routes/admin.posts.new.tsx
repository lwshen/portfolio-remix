import { Button, Grid, GridItem, Input, Textarea } from '@chakra-ui/react';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';

import { useState } from 'react';

import MarkdownRender from '~/components/MarkdownRender';
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
  let [markdown, setMarkdown] = useState('');

  return (
    <Form className="space-y-2" method="post">
      <div>
        <label>
          Post Title: <Input type="text" name="title" />
        </label>
      </div>
      <div>
        <label>
          Post Slug: <Input type="text" name="slug" />
        </label>
      </div>
      <div>
        <label htmlFor="markdown">Markdown:</label>
        <br />
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Textarea
              id="markdown"
              rows={15}
              name="markdown"
              value={markdown}
              onChange={e => {
                setMarkdown(e.target.value);
              }}
            />
          </GridItem>
          <GridItem>
            <MarkdownRender markdown={markdown} />
          </GridItem>
        </Grid>
      </div>
      <div>
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </div>
    </Form>
  );
}
