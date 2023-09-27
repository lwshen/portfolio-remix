import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import invariant from 'tiny-invariant';

import highlightStylesUrl from '~/styles/atom-one-dark.css';
import katexStylesUrl from '~/styles/katex.css';
import { getPost } from '~/utils/post.server';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: highlightStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: katexStylesUrl,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, 'expected params.slug');
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<typeof loader>();

  return (
    <div>
      <p className="text-3xl font-bold pb-8 jin-bu-ti">{post.attribute.title}</p>
      <div className="prose prose-p:my-2" dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
